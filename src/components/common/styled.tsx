import { Box, BoxProps, Button, ButtonProps, styled } from "@mui/material";

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
  whiteSpace: "pre",
  overflowWrap: "normal",
  overflowX: "hidden",
}));

export const InteractiveResponseWrapper = styled(Box)(() => ({
  width: "100%",
  height: "auto",
  minHeight: "800px",
  padding: "50px 0",
  position: "relative",
}));

export const InteractiveResponseLine = styled(Box)(() => ({
  position: "absolute",
  zIndex: "100",
  width: "120%",
  borderTop: `1px solid ${colors.white[400]}`,
}));

export const InteractiveResponseBadge = styled(Box)(() => ({
  position: "absolute",
  zIndex: "200",
  width: "30px",
  height: "30px",
  lineHeight: "30px",
  textAlign: "center",
  borderRadius: "50%",
  color: colors.white[100],
}));

export const InteractiveResponseBlock = styled(Button)<
  ButtonProps & { horizontaloffset: number; verticaloffset: number }
>(({ horizontaloffset, verticaloffset }) => ({
  position: "absolute",
  zIndex: "300",
  width: "60px",
  height: "30px",
  lineHeight: "30px",
  textAlign: "center",
  marginLeft: `${horizontaloffset}px`,
  marginTop: `${verticaloffset}px`,
  transition: "margin 1000ms ease-in-out",
}));
