import { Box, BoxProps, styled } from "@mui/material";

import { colors } from "styles";

export const AppContainer = styled(Box)<BoxProps & { mobile?: number }>(
  ({ mobile }) =>
    mobile
      ? {
          display: "block",
        }
      : {
          display: "flex",
        }
);

export const AppSectionWrapper = styled(Box)<BoxProps & { mobile?: number }>(
  ({ mobile }) =>
    mobile
      ? {
          width: "100%",
          minHeight: "50vh",
          padding: "20px",
          overflowY: "auto",
        }
      : {
          width: "50%",
          height: "100vh",
          padding: "20px",
          overflowY: "auto",
        }
);

export const InputBtnGroupJSON = styled(Box)(() => ({
  display: "flex",
  flexWrap: "wrap",
  alignContent: "bottom",
  marginTop: "20px",
  justifyContent: "right",
}));

export const InputFieldJSON = styled("textarea")(() => ({
  width: "100%",
  resize: "none",
  border: "0px",
  outline: "none",
  borderRadius: "none",
  backgroundColor: "transparent",
  overflowY: "scroll",
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
}));

export const FullScreenModal = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  position: "absolute",
  opacity: "0.9",
  top: "0",
  left: "0",
  backgroundColor: colors.white[100],
}));
