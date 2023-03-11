import { useState } from "react";

import { Send as SendIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useMobile, useResponse } from "common/hooks";
import { MessageType, BackendType, RequestMessage } from "common/types";
import { Client } from "backend";
import { TextFieldInput } from "components/message/common";

const BackendTypeLabel = {
  Gin: "Go Gin service",
  GinKafka: "Go Gin service via Kafka",
  Rails: "Ruby Rails service",
  Spring: "Kotlin Spring service",
  Django: "Python Django service",
};

export function MessageBuilder() {
  const mobile = useMobile();
  const [, setResponse] = useResponse();
  const [echoValue, setEchoValue] = useState("bonjour");
  const [readKey, setReadKey] = useState("key");
  const [writeKey, setWriteKey] = useState("key");
  const [writeValue, setWriteValue] = useState("12345");
  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState(MessageType.Hello);
  const [backendType, setBackendType] = useState(BackendType.Gin);

  const handleSend = async () => {
    setLoading(true);
    const client = new Client();
    const request: RequestMessage = {
      callTime: new Date().toISOString(),
      target: backendType,
      message: messageType,
    };
    if (messageType === MessageType.Echo) {
      request.value = echoValue;
    } else if (messageType === MessageType.Read) {
      request.key = readKey;
    } else if (messageType === MessageType.Write) {
      request.key = writeKey;
      request.value = writeValue;
    }
    const resp = await client.makeServiceCall(request);
    if (resp) {
      setLoading(false);
      setResponse(resp);
    }
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <FormControl sx={{ paddingLeft: "5px" }}>
          <RadioGroup
            row
            value={messageType}
            onChange={(e) => {
              setMessageType(e.target.value as MessageType);
            }}
          >
            <FormControlLabel
              value={MessageType.Hello}
              control={<Radio size="small" />}
              label={MessageType.Hello}
            />
            <FormControlLabel
              value={MessageType.Echo}
              control={<Radio size="small" />}
              label={MessageType.Echo}
            />
            <TextFieldInput
              label="Echo value"
              variant="filled"
              value={echoValue}
              onChange={(event) => {
                setEchoValue(event.target.value);
              }}
            />
            <FormControlLabel
              value={MessageType.Write}
              control={<Radio size="small" />}
              label={MessageType.Write}
            />
            <TextFieldInput
              label="Write key"
              variant="filled"
              value={writeKey}
              onChange={(event) => {
                setWriteKey(event.target.value);
              }}
            />
            <TextFieldInput
              label="Write value"
              variant="filled"
              value={writeValue}
              onChange={(event) => {
                setWriteValue(event.target.value);
              }}
            />
            <FormControlLabel
              value={MessageType.Read}
              control={<Radio size="small" />}
              label={MessageType.Read}
            />
            <TextFieldInput
              label="Read key"
              variant="filled"
              value={readKey}
              onChange={(event) => {
                setReadKey(event.target.value);
              }}
            />
          </RadioGroup>
        </FormControl>

        <FormControl sx={{ paddingLeft: "5px" }}>
          <RadioGroup
            row
            value={backendType}
            onChange={(e) => {
              setBackendType(e.target.value as BackendType);
            }}
          >
            {Object.values(BackendType).map((value) => (
              <FormControlLabel
                key={value}
                value={value}
                label={BackendTypeLabel[value]}
                control={<Radio size="small" />}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: mobile ? "column" : "row",
          marginBottom: "35px",
          "& button": {
            marginRight: "20px",
          },
        }}
      >
        <LoadingButton
          onClick={handleSend}
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
          sx={{ marginLeft: "10px" }}
        >
          Send
        </LoadingButton>
      </Box>
    </>
  );
}
