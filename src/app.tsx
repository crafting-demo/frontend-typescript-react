import { CssBaseline } from "@mui/material";

import { useMobile } from "common/hooks";
import { AppContainer, AppSectionWrapper } from "components/common";
import { Message } from "components/message";
import { Response } from "components/response";

export function App() {
  const mobile = useMobile();

  return (
    <>
      <CssBaseline />

      <AppContainer mobile={+mobile}>
        <AppSectionWrapper mobile={+mobile}>
          <Message />
        </AppSectionWrapper>

        <AppSectionWrapper mobile={+mobile}>
          <Response />
        </AppSectionWrapper>
      </AppContainer>
    </>
  );
}
