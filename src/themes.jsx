import { createTheme } from "@material-ui/core";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: "rgb(13, 17, 23)",
    text: "rgb(255, 255, 255)",
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: "rgb(255, 255, 255)",
    text: "rgb(13, 17, 23)",
  },
});
