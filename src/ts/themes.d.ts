/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Palette,
  PaletteOptions,
  TypeBackground,
  TypeBackgroundOptions,
} from "@mui/material/styles";
/* eslint-enable @typescript-eslint/no-unused-vars */

// Force custom themes to declare these colors,
// and give them as type hint when using the theme
declare module "@mui/material/styles" {
  // theme.palette.<>
  interface PaletteExtension {
    game: {
      features: {
        background: React.CSSProperties["color"];
        obstacle: React.CSSProperties["color"];
      };
      colors: {
        black: React.CSSProperties["color"];
        gray: React.CSSProperties["color"];
        brown: React.CSSProperties["color"];
        red: React.CSSProperties["color"];
        orange: React.CSSProperties["color"];
        yellow: React.CSSProperties["color"];
        green: React.CSSProperties["color"];
        blue: React.CSSProperties["color"];
      };
    };
  }
  // theme.palette.background.<>
  interface BackgroundExtension {
    disabled: React.CSSProperties["color"];
  }

  // Apply to both give typehints and declaration warnings
  interface Palette extends PaletteExtension {}
  interface PaletteOptions extends PaletteExtension {}
  interface TypeBackground extends BackgroundExtension {}
  interface TypeBackgroundOptions extends BackgroundExtensions {}
}
