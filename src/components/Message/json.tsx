import { useEffect, useState } from "react";

import { Box, Button, TextField } from "@mui/material";

import { Message, ValidateMessage } from "common";
import { RandomMessageString } from "common/random";

export function MessageBuilderJSON() {
  const [value, setValue] = useState("");
  const [errors, setErrors] = useState("");
  const [send, setSend] = useState(false);

  const url = `${process.env.REACT_APP_BROKER_SERVICE_ADDR}`.replace(
    /^http/,
    "ws"
  );

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

    const msg = JSON.parse(value) as Message;

    const socket = new WebSocket(`${url}/producer/${msg.meta.callee}`);

    socket.onopen = () => {
      socket.send(JSON.stringify(msg));
      setSend(false);
    };
  }, [send]);

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
        <Button onClick={handleSendMessage}>Send Message</Button>
      </Box>
    </>
  );
}
