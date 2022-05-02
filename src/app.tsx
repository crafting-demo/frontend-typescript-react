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
import { TimelineBuilder } from "components/timeline";

export function App() {
  const mobile = useMobile();

  return (
    <>
      <CssBaseline />

      <AppContainer mobile={+mobile}>
        <AppWrapperMessage mobile={+mobile}>
          <AppWrapperName variant="h1">
            Crafting Demo - Multi-lang Multi-service app.
          </AppWrapperName>
          <AppDivider />
          <MessageBuilder />
        </AppWrapperMessage>

        <AppWrapperTimeline mobile={+mobile}>
          <TimelineBuilder />
        </AppWrapperTimeline>
      </AppContainer>
    </>
  );
}
