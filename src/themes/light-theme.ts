import { createTheme, responsiveFontSizes } from "@mui/material";

export const lightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "light",
      background: {
        default: "#e0e0e0",
        paper: "#e0e0e0",
      },
      text: {
        primary: "rgb(13,17,23)",
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
          yellow: "rgb(244,187,110)",
          green: "rgb(105,180,120)",
          blue: "rgb(53,152,183)",
          cyan: "rgb(177,227,241)",
          purple: "rgb(172,38,134)",
        },
      },
    },
  })
);
