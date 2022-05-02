import { Box, BoxProps, Divider, styled, Typography } from "@mui/material";

import { colors } from "styles";

export const AppContainer = styled(Box)<BoxProps & { mobile?: number }>(
  ({ mobile }) => ({
    display: mobile ? "block" : "flex",
    "& div": {
      "::-webkit-scrollbar": {
        width: "4px",
      },
      "::-webkit-scrollbar-track": {
        backgroundColor: "#F1F1F1",
        borderRadius: "16px",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#CCCCCC",
        borderRadius: "16px",
      },
      "::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#BDBDBD",
      },
    },
  })
);

export const AppWrapperMessage = styled(Box)<BoxProps & { mobile?: number }>(
  ({ mobile }) => ({
    overflowY: "scroll",
    width: mobile ? "100%" : "60%",
    minHeight: mobile ? "50vh" : "100vh",
    padding: mobile ? "20px 10px" : "20px",
  })
);

export const AppWrapperTimeline = styled(Box)<BoxProps & { mobile?: number }>(
  ({ mobile }) => ({
    width: mobile ? "100%" : "40%",
    minHeight: mobile ? "50vh" : "100vh",
  })
);

export const AppWrapperName = styled(Typography)(() => ({
  fontSize: "30px",
  margin: "30px 0",
  color: colors.black[200],
}));

export const AppDivider = styled(Divider)(() => ({
  maxWidth: "200px",
  margin: "40px 0",
  color: colors.black[200],
  borderColor: colors.black[400],
}));
