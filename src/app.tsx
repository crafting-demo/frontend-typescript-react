import { useState } from "react";

import { CssBaseline } from "@mui/material";

import { MessageType, BackendType } from "common";
import { AppContainer } from "components/common";
import { Diagram } from "components/diagram";
import { MessageBuilder } from "components/message";
import { ResponseBuilder } from "components/response";

export function App() {
  const [messageType, setMessageType] = useState(MessageType.Hello);
  const [backendType, setBackendType] = useState(BackendType.Gin);

  return (
    <>
      <CssBaseline />

      <AppContainer>
        <Diagram
          {...{ messageType, backendType }}
          sx={{ maxWidth: "750px", marginBottom: "12px" }}
        />

        <MessageBuilder
          {...{ messageType, setMessageType, backendType, setBackendType }}
        />

        <ResponseBuilder />
      </AppContainer>
    </>
  );
}
