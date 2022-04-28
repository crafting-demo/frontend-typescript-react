import { useState } from "react";

import { CssBaseline } from "@mui/material";

import { useMobile } from "common/hooks";
import { Message } from "common/types";
import { AppContainer, AppSectionWrapper } from "components/common";
import { MessageBuilder } from "components/message";
import { ResponseBuilder } from "components/response";

export function App() {
  return (
    <>
      <CssBaseline />
      <Page />
    </>
  );
}

function Page() {
  const mobile = useMobile();
  const [response, setResponse] = useState<Message>();

  const handleChangeResponse = (message: Message) => {
    setResponse(message);
  };

  return (
    <AppContainer mobile={+mobile}>
      <AppSectionWrapper mobile={+mobile}>
        <MessageBuilder onCallback={handleChangeResponse} />
      </AppSectionWrapper>

      <AppSectionWrapper mobile={+mobile}>
        <ResponseBuilder response={response} />
      </AppSectionWrapper>
    </AppContainer>
  );
}
