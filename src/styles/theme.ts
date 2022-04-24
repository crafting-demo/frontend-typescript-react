import { createTheme } from "@mui/material/styles";

import { colors } from "styles/palette";

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.red[200],
    },
    secondary: {
      main: colors.green[200],
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
  },
});
