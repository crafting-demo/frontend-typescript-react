import { useState } from "react";

import { Button, Snackbar, Alert } from "@mui/material";

import { Client } from "common/backend-client";
import { useMobile } from "common/hooks";
import { RandomMessageString, ValidateMessage } from "common/message";
import { Message } from "common/types";
import { InputField, InputBtnGroup } from "components/common";

interface MessageBuilderParams {
  onCallback: (message: Message) => void;
}

export function MessageBuilder(params: MessageBuilderParams) {
  const mobile = useMobile();
  const [message, setMessage] = useState(RandomMessageString());
  const [errors, setErrors] = useState("");
  const [open, setOpen] = useState(false);

  const validateMessage = (): boolean => {
    const err = ValidateMessage(message);
    if (err.length > 0) {
      setErrors(`Error: ${err.join(", ")}`);
      return false;
    }
    setErrors("");
    return true;
  };

  const handleOpenSnackbar = () => {
    setOpen(true);
  };

  const handleCloseSnackbar = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setMessage(event.target.value);
    setErrors("");
  };

  const handleGenerate = () => {
    setMessage(RandomMessageString());
    setErrors("");
  };

  const handleClear = () => {
    setMessage("");
  };

  const handleValidate = () => {
    validateMessage();
    handleOpenSnackbar();
  };

  const handleSend = async () => {
    const valid = validateMessage();
    if (!valid) {
      handleOpenSnackbar();
      return;
    }
    const msg = JSON.parse(message) as Message;
    const client = new Client(msg.meta.callee);
    msg.meta.callTime = new Date().toISOString();
    const resp = await client.makeNestedCall(msg);
    if (resp) {
      const { onCallback } = params;
      onCallback(resp);
    }
  };

  return (
    <>
      <InputBtnGroup
        variant="text"
        size="small"
        orientation={mobile ? "vertical" : "horizontal"}
      >
        <Button onClick={handleGenerate}>Generate</Button>
        <Button onClick={handleClear} disabled={!message}>
          Clear
        </Button>
        <Button onClick={handleValidate} disabled={!message}>
          Validate
        </Button>
        <Button onClick={handleSend} disabled={!message}>
          Send
        </Button>
      </InputBtnGroup>

      <InputField
        value={message}
        rows={mobile ? 30 : 45}
        onChange={handleChange}
      />

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={errors ? "error" : "success"}
        >
          {errors || "Validation passed"}
        </Alert>
      </Snackbar>
    </>
  );
}
