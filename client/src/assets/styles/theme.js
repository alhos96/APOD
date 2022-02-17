import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#0B3D91",
    },
    secondary: {
      main: "#FC3D21",
    },
    text: {
      primary: "rgba(18,18,18,0.8)",
      secondary: "#272727cc",
      disabled: "#585858fd",
      hint: "#FC3D21",
      white: "#fff",
    },
    divider: "#0b3c9187",
  },
  typography: {
    fontSize: 15,
  },
});
