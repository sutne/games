import "@mui/material/styles";
// Force themes to declare these colors,
// and give them as type hint when using the theme
declare module "@mui/material/styles" {
  interface MyGameColors {
    game: {
      black: React.CSSProperties["color"];
      gray: React.CSSProperties["color"];
      brown: React.CSSProperties["color"];
      red: React.CSSProperties["color"];
      orange: React.CSSProperties["color"];
      yellow: React.CSSProperties["color"];
      green: React.CSSProperties["color"];
      blue: React.CSSProperties["color"];
    };
  }

  interface Theme extends MyGameColors {}
  interface ThemeOptions extends MyGameColors {}

  interface TypeBackground {
    disabled: React.CSSProperties["color"];
  }
  interface TypeBackgroundOptions {
    disabled: React.CSSProperties["color"];
  }
}
