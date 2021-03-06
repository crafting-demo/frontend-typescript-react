import { CssBaseline } from "@mui/material";

import { useMobile } from "common/hooks";
import {
  AppContainer,
  AppWrapperMessage,
  AppWrapperResponse,
} from "components/common";
import { MessageBuilder } from "components/message";
import { ResponseBuilder } from "components/response";

export function App() {
  const mobile = useMobile();

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
