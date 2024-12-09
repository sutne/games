import { createTheme, responsiveFontSizes } from "@mui/material";

export const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "rgb(29,39,51)",
        paper: "rgb(44,49,62)",
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
          cyan: "rgb(197,247,255)",
          purple: "rgb(248,70,158)",
        },
      },
    },
  })
);
