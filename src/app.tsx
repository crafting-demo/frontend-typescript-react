import { useState } from "react";

import { CssBaseline } from "@mui/material";

import { useMobile } from "common/hooks";
import { Message } from "common/types";
import { AppContainer, AppSectionWrapper } from "components/common";
import { MessageBuilder } from "components/message";
import { Response } from "components/response";

export function App() {
  const mobile = useMobile();
  const [message, setMessage] = useState<Message>();

  const handleChange = (msg: Message) => {
    setMessage(msg);
  };

  return (
    <>
      <CssBaseline />

      <AppContainer mobile={+mobile}>
        <AppSectionWrapper mobile={+mobile}>
          <MessageBuilder onCallback={handleChange} />
        </AppSectionWrapper>

        <AppSectionWrapper mobile={+mobile}>
          <Response message={message} />
        </AppSectionWrapper>
      </AppContainer>
    </>
  );
}
