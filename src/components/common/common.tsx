import { Box, BoxProps, styled } from "@mui/material";

import { colors } from "styles";

export const AppContainer = styled(Box)<BoxProps & { mobile?: number }>(
  ({ mobile }) => ({
    display: mobile ? "block" : "flex",
    "& div": {
      ...ScrollbarSettings,
    },
  })
);

export const AppWrapperMessage = styled(Box)<BoxProps & { mobile?: number }>(
  ({ mobile }) => ({
    overflowY: "scroll",
    width: mobile ? "100%" : "50%",
    minHeight: mobile ? "50vh" : "100vh",
    height: mobile ? "auto" : "100vh",
    padding: "20px",
  })
);

export const AppWrapperResponse = styled(Box)<BoxProps & { mobile?: number }>(
  ({ mobile }) => ({
    overflowY: "scroll",
    width: mobile ? "100%" : "50%",
    minHeight: mobile ? "50vh" : "100vh",
    height: mobile ? "auto" : "100vh",
    padding: "20px",
  })
);

export const ScrollbarSettings = {
  "::-webkit-scrollbar": {
    width: "4px",
  },
  "::-webkit-scrollbar-track": {
    backgroundColor: colors.white[200],
    borderRadius: "16px",
  },
  "::-webkit-scrollbar-thumb": {
    background: colors.grey[100],
    borderRadius: "16px",
  },
  "::-webkit-scrollbar-thumb:hover": {
    backgroundColor: colors.grey[200],
  },
};
