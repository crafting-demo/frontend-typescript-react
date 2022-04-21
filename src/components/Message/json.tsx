import { useState } from "react";

import { Box, Button, ButtonGroup, TextField } from "@mui/material";

import { RandomMessageString, ValidateMessage } from "common";

export function MessageBuilderJSON() {
  const [value, setValue] = useState("");
  const [errors, setErrors] = useState("");

  const handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setErrors("");
  };

  const handleGenerateRandomMessage = () => {
    setValue(RandomMessageString());
    setErrors("");
  };

  const handleClearMessage = () => {
    setValue("");
    setErrors("");
  };

  const handleValidateMessage = () => {
    const err = ValidateMessage(value);
    if (err.length > 0) {
      setErrors(`Errors: ${err.join(", ")}`);
      return;
    }
    setErrors("");
  };

  const handleQueueMessage = async () => {
    handleValidateMessage();
    if (errors !== "") {
      return;
    }

    try {
      // TODO: handle message enqueue
    } catch (e) {
      setErrors(`${e}`);
    }
  };

  return (
    <>
      <TextField
        multiline
        autoFocus
        fullWidth
        minRows={20}
        maxRows={20}
        value={value}
        onChange={handleChangeMessage}
        variant="filled"
        error={errors !== ""}
        helperText={errors}
      />

      <Box
        sx={{
          display: "flex",
          alignContent: "bottom",
          justifyContent: "right",
        }}
      >
        <Button onClick={handleGenerateRandomMessage}>Auto Generate</Button>
        <Button onClick={handleClearMessage}>Clear</Button>
        <Button onClick={handleValidateMessage}>Validate</Button>
        <Button onClick={handleQueueMessage}>Send Request</Button>
      </Box>
    </>
  );
}
