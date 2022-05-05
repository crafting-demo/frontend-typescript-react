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
    MuiTimeline: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
      },
    },
  },
});
