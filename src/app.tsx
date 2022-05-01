import { CssBaseline } from "@mui/material";

import { useMobile } from "common/hooks";
import {
  AppContainer,
  AppWrapperMessage,
  AppWrapperTimeline,
} from "components/common";
import { Message } from "components/message";
import { Timeline } from "components/timeline";

export function App() {
  const mobile = useMobile();

  return (
    <>
      <CssBaseline />

      <AppContainer mobile={+mobile}>
        <AppWrapperMessage mobile={+mobile}>
          <Message />
        </AppWrapperMessage>
        <AppWrapperTimeline mobile={+mobile}>
          <Timeline />
        </AppWrapperTimeline>
      </AppContainer>
    </>
  );
}
