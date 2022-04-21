import React from "react";

import { ThemeProvider } from "@mui/material";
import ReactDOM from "react-dom/client";

import { theme } from "styles/theme";

import { App } from "./app";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
