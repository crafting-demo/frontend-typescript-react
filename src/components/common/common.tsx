import { Box, BoxProps, Divider, styled, Typography } from "@mui/material";

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
    width: mobile ? "100%" : "60%",
    minHeight: mobile ? "50vh" : "100vh",
    height: mobile ? "auto" : "100vh",
    padding: mobile ? "20px 10px" : "20px",
  })
);

export const AppWrapperTimeline = styled(Box)<BoxProps & { mobile?: number }>(
  ({ mobile }) => ({
    overflowY: "scroll",
    width: mobile ? "100%" : "40%",
    minHeight: mobile ? "50vh" : "100vh",
    height: mobile ? "auto" : "100vh",
  })
);

export const AppWrapperName = styled(Typography)(() => ({
  fontSize: "30px",
  margin: "25px 0",
  color: colors.black[100],
}));

export const AppDivider = styled(Divider)(() => ({
  maxWidth: "200px",
  margin: "40px 0",
  borderColor: colors.white[200],
}));

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
