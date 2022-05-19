import React from "react";

import { ThemeProvider } from "@mui/material";
import ReactDOM from "react-dom/client";

import { App } from "app";
import { ResponseProvider } from "components/response";
import { theme } from "styles/theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ResponseProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ResponseProvider>
  </React.StrictMode>
);
