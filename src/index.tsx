import React from "react";

import { ThemeProvider } from "@mui/material";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ReactDOM from "react-dom/client";

import { theme } from "styles/theme";

import { App } from "./app";

TimeAgo.addDefaultLocale(en);

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
