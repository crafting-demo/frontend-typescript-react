import { Box, BoxProps, styled } from "@mui/material";

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
  })
);

export const AppWrapperTimeline = styled(Box)<BoxProps & { mobile?: number }>(
  ({ mobile }) => ({
    width: mobile ? "100%" : "40%",
    minHeight: mobile ? "50vh" : "100vh",
  })
);
