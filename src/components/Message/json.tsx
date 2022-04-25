import { useEffect, useState } from "react";

import { Box, Button, TextField } from "@mui/material";

import { Message, ValidateMessage } from "common";
import { Producer } from "common/kafka-client";
import { RandomMessageString } from "common/random";

export function MessageBuilderJSON() {
  const [message, setMessage] = useState(RandomMessageString());
  const [send, setSend] = useState(false);
  const [errors, setErrors] = useState("");

  const handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
    setErrors("");
  };

  const handleGenerateRandomMessage = () => {
    setMessage(RandomMessageString());
    setErrors("");
  };

  const handleClearMessage = () => {
    setMessage("");
    setErrors("");
  };

  const handleValidateMessage = () => {
    const err = ValidateMessage(message);
    if (err.length > 0) {
      setErrors(`Errors: ${err.join(", ")}`);
      return;
    }
    setErrors("");
  };

  const handleSendMessage = async () => {
    handleValidateMessage();
    if (!errors) {
      setSend(true);
    }
  };

  useEffect(() => {
    if (!send) {
      return;
    }
    const msg = JSON.parse(message) as Message;
    const producer = new Producer(msg.meta.callee);
    producer.send(message);
    setSend(false);
  }, [send]);

  return (
    <>
      <TextField
        multiline
        autoFocus
        fullWidth
        minRows={20}
        maxRows={20}
        value={message}
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
        <Button onClick={handleSendMessage}>Send Message</Button>
      </Box>
    </>
  );
}
