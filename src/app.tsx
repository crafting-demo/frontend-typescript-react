import { CssBaseline } from "@mui/material";

import { useMobile } from "common/hooks";
import {
  AppContainer,
  AppWrapperMessage,
  AppWrapperTimeline,
  AppWrapperName,
  AppDivider,
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
          <AppWrapperName variant="h1">
            Crafting Demo - multi-lang multi-service app.
          </AppWrapperName>
          <AppDivider />
          <MessageBuilder />
        </AppWrapperMessage>

        <AppWrapperTimeline mobile={+mobile}>
          <ResponseBuilder />
        </AppWrapperTimeline>
      </AppContainer>
    </>
  );
}
