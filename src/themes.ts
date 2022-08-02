import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "rgb(29,39,51)",
      paper: "rgb(43,49,63)",
      disabled: "rgb(29,35,49)",
    },
  },
  game: {
    features: {
      background: "rgb(73,79,88)",
      obstacle: "rgb(44,49,62)",
    },
    colors: {
      black: "rgb(18,26,39)",
      gray: "rgb(43,49,63)",
      brown: "rgb(157,93,92)",
      red: "rgb(220,77,68)",
      orange: "rgb(208,135,102)",
      yellow: "rgb(242,201,121)",
      green: "rgb(125,200,140)",
      blue: "rgb(177,227,241)",
    },
  },
  myShadows: {
    box: "rgba(0, 0, 0, 1)",
    neumorphic: {
      light: "#313848",
      dark: "#252a36",
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#e0e0e0",
      paper: "#e0e0e0",
      disabled: "#e0e0e0",
    },
    text: {
      primary: "rgb(13,17,23)",
    },
  },
  game: {
    features: {
      background: "#e0e0e0",
      obstacle: "rgb(200,200,200)",
    },
    colors: {
      black: "rgb(18,26,39)",
      gray: "rgb(43,49,63)",
      brown: "rgb(157,93,92)",
      red: "rgb(220,77,68)",
      orange: "rgb(208,135,102)",
      yellow: "rgb(254,197,120)",
      green: "rgb(125,200,140)",
      blue: "rgb(53,152,183)",
    },
  },
  myShadows: {
    box: "#bebebe",
    neumorphic: {
      light: "#ffffff",
      dark: "#bebebe",
    },
  },
});
