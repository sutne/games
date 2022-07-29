import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "rgb(13,17,23)",
      paper: "rgb(25,35,45)",
      disabled: "rgb(17,20,26)",
    },
  },
  game: {
    black: "rgb(20,30,40)",
    gray: "rgb(40,50,70)",
    brown: "rgb(100,50,50)",
    red: "rgb(200,50,50)",
    orange: "rgb(200,200,100)",
    yellow: "rgb(50,200,200)",
    green: "rgb(50,200,50)",
    blue: "rgb(50,50,200)",
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#FOFOF3",
      paper: "#FOFOF3",
      disabled: "#FOFOF3",
    },
    text: {
      primary: "rgb(13,17,23)",
    },
  },
  game: {
    black: "rgb(20,30,40)",
    gray: "rgb(40,50,70)",
    brown: "rgb(100,50,50)",
    red: "rgb(200,50,50)",
    orange: "rgb(200,200,100)",
    yellow: "rgb(50,200,200)",
    green: "rgb(50,200,50)",
    blue: "rgb(50,50,200)",
  },
});
