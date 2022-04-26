import { CssBaseline } from "@mui/material";

import { useMobile } from "common/hooks";
import { AppContainer, AppSectionWrapper } from "components/common";
import { Message } from "components/message";
import { Response } from "components/response";
import { colors } from "styles";

export function App() {
  const mobile = useMobile();

  return (
    <>
      <CssBaseline />

      <AppContainer mobile={+mobile}>
        <AppSectionWrapper
          mobile={+mobile}
          sx={{
            width: "500px",
            backgroundColor: colors.white[100],
            overflowY: "auto",
          }}
        >
          <Message />
        </AppSectionWrapper>

        <AppSectionWrapper
          mobile={+mobile}
          sx={{
            width: "calc(100vw - 500px)",
            overflowX: "hidden",
            backgroundColor: colors.white[200],
          }}
        >
          <Response />
        </AppSectionWrapper>
      </AppContainer>
    </>
  );
}
