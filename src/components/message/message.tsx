import { useEffect, useState } from "react";

import { Send as SendIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
} from "@mui/material";

import { Client } from "backend";
import { useMobile, useResponse } from "common/hooks";
import { BackendType, MessageType, RequestMessage } from "common/types";
import { SubFieldWrapper, TextFieldInput } from "components/message/common";

const BackendTypeLabel = {
  Gin: "Go Gin",
  GinKafka: "Go Gin via Kafka",
  Rails: "Ruby Rails",
  Spring: "Kotlin Spring",
  Django: "Python Django",
};

interface MessageBuilderProps {
  backendType: BackendType;
  setBackendType: React.Dispatch<React.SetStateAction<BackendType>>;
  messageType: MessageType;
  setMessageType: React.Dispatch<React.SetStateAction<MessageType>>;
}

export function MessageBuilder({
  backendType,
  setBackendType,
  messageType,
  setMessageType,
}: MessageBuilderProps) {
  const mobile = useMobile();
  const [response, setResponse] = useResponse();
  const [responseMessage, setResponseMessage] = useState("");
  const [echoValue, setEchoValue] = useState("bonjour");
  const [readKey, setReadKey] = useState("key");
  const [writeKey, setWriteKey] = useState("key");
  const [writeValue, setWriteValue] = useState("12345");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setResponseMessage("");
  }, [backendType, messageType]);
  useEffect(() => {
    setResponseMessage(response.message);
  }, [response]);

  const handleSend = async () => {
    setLoading(true);
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
    const resp = await Client.makeServiceCall(request);
    if (resp) {
      setLoading(false);
      setResponse(resp);
    }
  };

  const handleSendOnEnter = (event: React.KeyboardEvent) => {
    if (event.code === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      <Box
        sx={{
          width: mobile ? "100%" : "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: mobile ? "center" : "stretch",
        }}
      >
        <FormControl
          sx={{
            display: "flex",
            flexDirection: mobile ? "column" : "row",
            alignItems: mobile ? "flex-start" : "center",
            gap: "16px",
          }}
        >
          <FormLabel sx={{ display: mobile ? "none" : "span" }}>
            Backend
          </FormLabel>
          <ButtonGroup variant="outlined">
            {Object.values(BackendType).map((value) => (
              <Button
                key={value}
                variant={backendType === value ? "contained" : "outlined"}
                sx={{ textTransform: "none" }}
                onClick={() => setBackendType(value)}
              >
                {BackendTypeLabel[value]}
              </Button>
            ))}
          </ButtonGroup>
        </FormControl>

        <FormControl
          sx={{
            marginTop: "12px",
            display: "flex",
            minWidth: "210px",
            width: mobile ? "auto" : "660px",
            flexDirection: mobile ? "column" : "row",
            gap: "16px",
          }}
        >
          <FormLabel
            sx={{ lineHeight: "34px", display: mobile ? "none" : "span" }}
          >
            Message
          </FormLabel>
          <RadioGroup
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
            <SubFieldWrapper
              mobile={+mobile}
              expanded={messageType === MessageType.Echo}
            >
              <TextFieldInput
                label="Echo value"
                variant="filled"
                value={echoValue}
                onChange={(event) => {
                  setEchoValue(event.target.value);
                }}
                onKeyUp={handleSendOnEnter}
              />
            </SubFieldWrapper>
            <FormControlLabel
              value={MessageType.Write}
              control={<Radio size="small" />}
              label={MessageType.Write}
            />
            <SubFieldWrapper
              mobile={+mobile}
              expanded={messageType === MessageType.Write}
            >
              <TextFieldInput
                label="Write key"
                variant="filled"
                value={writeKey}
                onChange={(event) => {
                  setWriteKey(event.target.value);
                }}
                onKeyUp={handleSendOnEnter}
              />
              <TextFieldInput
                label="Write value"
                variant="filled"
                value={writeValue}
                onChange={(event) => {
                  setWriteValue(event.target.value);
                }}
                onKeyUp={handleSendOnEnter}
              />
            </SubFieldWrapper>
            <FormControlLabel
              value={MessageType.Read}
              control={<Radio size="small" />}
              label={MessageType.Read}
            />
            <SubFieldWrapper
              mobile={+mobile}
              expanded={messageType === MessageType.Read}
            >
              <TextFieldInput
                label="Read key"
                variant="filled"
                value={readKey}
                onChange={(event) => {
                  setReadKey(event.target.value);
                }}
                onKeyUp={handleSendOnEnter}
              />
            </SubFieldWrapper>
          </RadioGroup>
          <Box
            sx={{
              flex: 1,
              display: mobile ? "none" : "flex",
              justifyContent: "center",
              textAlign: "center",
              padding: "46px 0 0 12px",
              fontStyle: "italic",
            }}
          >
            {responseMessage}
          </Box>
        </FormControl>
      </Box>

      <LoadingButton
        onClick={handleSend}
        endIcon={<SendIcon />}
        loading={loading}
        loadingPosition="end"
        variant="contained"
        fullWidth={mobile}
        sx={{
          margin: "12px auto 36px",
        }}
      >
        Send
      </LoadingButton>
    </>
  );
}
