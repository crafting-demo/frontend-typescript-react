import { createTheme } from "@mui/material/styles";

import type {} from "@mui/lab/themeAugmentation";
import { colors } from "styles/palette";

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.violet[100],
    },
    secondary: {
      main: colors.green[100],
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.white[100],
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow: "none",
          border: `1px solid ${colors.white[200]}`,
          backgroundColor: colors.white[100],
        },
      },
    },
  },
});
