import { Box, BoxProps, styled } from "@mui/material";

import { colors } from "styles";

export const AppContainer = styled(Box)<BoxProps>(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "12px",
  "& div": {
    ...ScrollbarSettings,
  },
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
