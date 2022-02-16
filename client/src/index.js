import { ThemeProvider } from "@mui/material";
import { theme } from "./assets/styles/theme.js";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
