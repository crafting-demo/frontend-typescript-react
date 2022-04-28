import { useState } from "react";

import { Alert, Button, Snackbar } from "@mui/material";

import { Client } from "common/backend-client";
import { RandomMessageString, ValidateMessage } from "common/helpers";
import { useMobile } from "common/hooks";
import { Message } from "common/types";
import { InputBtnGroupJSON, InputFieldJSON } from "components/common";

interface MessageBuilderJSONParams {
  onCallback: (message: Message) => void;
}

export function MessageBuilderJSON(params: MessageBuilderJSONParams) {
  const { onCallback } = params;
  const mobile = useMobile();

  const [message, setMessage] = useState(RandomMessageString());
  const [errors, setErrors] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChangeMessage = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setMessage(event.target.value);
    setErrors("");
  };

  const handleGenerateMessage = () => {
    setMessage(RandomMessageString());
    setErrors("");
  };

  const handleClearMessage = () => {
    setMessage("");
  };

  const handleSetErrors = (): boolean => {
    const err = ValidateMessage(message);
    if (err.length > 0) {
      setErrors(`Errors: ${err.join(", ")}`);
      return true;
    }
    setErrors("");
    return false;
  };

  const handleValidateMessage = () => {
    handleSetErrors();
    handleOpen();
  };

  const handleSendMessage = async () => {
    const err = handleSetErrors();
    if (err) {
      handleOpen();
      return;
    }
    const msg = JSON.parse(message) as Message;
    const client = new Client(msg.meta.callee);
    const resp = await client.makeNestedCall(msg);
    if (resp) {
      onCallback(resp);
    }
  };

  return (
    <>
      <InputFieldJSON
        value={message}
        rows={mobile ? 30 : 40}
        onChange={handleChangeMessage}
      />

      <InputBtnGroupJSON>
        <Button onClick={handleGenerateMessage}>Generate</Button>
        <Button onClick={handleClearMessage}>Clear</Button>
        <Button onClick={handleValidateMessage}>Validate</Button>
        <Button onClick={handleSendMessage}>Send</Button>
      </InputBtnGroupJSON>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={errors ? "error" : "success"}>
          {errors || "Validation passed"}
        </Alert>
      </Snackbar>
    </>
  );
}
