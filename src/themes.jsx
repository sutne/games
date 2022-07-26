import { createTheme } from "@material-ui/core";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    myBackground: "rgb(13, 17, 23)",
    myText: "rgb(255, 255, 255)",
    myCard: "rgb(40, 50, 65)",
    myWrapperBackground: "rgb(19, 23, 35)",
    myWrapperBorder: "rgb(27, 29, 42)",
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    myBackground: "rgb(255, 255, 255)",
    myText: "rgb(13, 17, 23)",
    myCard: "rgb(255, 255, 255)",
    myWrapperBackground: "rgb(240, 240, 240)",
    myWrapperBorder: "rgb(230, 230, 230)",
  },
});
