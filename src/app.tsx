import { useEffect, useState } from "react";

import { CssBaseline } from "@mui/material";

import { useMobile, useResponse } from "common/hooks";
import { ServiceType, Message } from "common/types";
import {
  AppContainer,
  AppWrapperMessage,
  AppWrapperResponse,
} from "components/common";
import { MessageBuilder } from "components/message";
import { ResponseBuilder } from "components/response";
import { Consumer } from "kafka";

export function App() {
  const mobile = useMobile();
  const [message, setMessage] = useState("");
  const [, setResponse] = useResponse();

  const handleChange = (newMessage: string) => {
    setMessage(newMessage);
  };

  useEffect(() => {
    const consumer = new Consumer(
      ServiceType.React,
      handleChange,
      undefined,
      "latest"
    );
    consumer.start();
  }, []);

  useEffect(() => {
    if (!message) {
      return;
    }
    const parsed = JSON.parse(message) as Message;
    setResponse(parsed);
  }, [message]);

  return (
    <>
      <CssBaseline />

      <AppContainer mobile={+mobile}>
        <AppWrapperMessage mobile={+mobile}>
          <MessageBuilder />
        </AppWrapperMessage>

        <AppWrapperResponse mobile={+mobile}>
          <ResponseBuilder />
        </AppWrapperResponse>
      </AppContainer>
    </>
  );
}
