import "@mui/material/styles";

// Force custom themes to declare these colors,
// and give them as type hint when using the theme
declare module "@mui/material/styles" {
  // theme.<>
  interface ThemeExtension {
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
  // theme.background.<>
  interface BackgroundExtension {
    disabled: React.CSSProperties["color"];
  }

  // Apply to both give typehints and declaration warnings
  interface Theme extends ThemeExtension {}
  interface ThemeOptions extends ThemeExtension {}
  interface TypeBackground extends BackgroundExtension {}
  interface TypeBackgroundOptions extends BackgroundExtensions {}
}
