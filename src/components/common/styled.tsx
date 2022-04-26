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
          width: "100% !important",
          minHeight: "50vh",
          padding: "20px",
        }
      : {
          height: "100vh",
          padding: "20px",
        }
);

export const InputBtnGroupJSON = styled(Box)(() => ({
  display: "flex",
  alignContent: "bottom",
  flexWrap: "wrap",
  borderLeft: `1px dashed ${colors.purple[100]}`,
}));

export const InputFieldJSON = styled("textarea")(() => ({
  width: "100%",
  resize: "none",
  border: "0px",
  outline: "none",
  paddingLeft: "5px",
  borderLeft: `1px dashed ${colors.purple[100]}`,
  borderRadius: "none",
}));
