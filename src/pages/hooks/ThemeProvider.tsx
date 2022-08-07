import React, { useEffect, useState } from "react";
import {
  Theme,
  ThemeProvider as MuiThemeProvider,
  useMediaQuery,
} from "@mui/material";

import {
  getCookiePreferences,
  setCookiePreferences,
} from "services/preferences";
import { darkTheme, lightTheme } from "themes";

type props = {
  children: JSX.Element;
};
const ThemeContext = React.createContext<
  | {
      theme: Theme;
      swapTheme: () => void;
      themeIsDark: boolean;
    }
  | undefined
>(undefined);
export function ThemeProvider({ children }: props) {
  const prefersDarkTheme = useMediaQuery("(prefers-color-scheme: dark)");
  const preferences = getCookiePreferences({
    useDarkTheme: prefersDarkTheme,
  });
  const [theme, setTheme] = useState(
    preferences.useDarkTheme ? darkTheme : lightTheme
  );

  const swapTheme = () => {
    if (theme === lightTheme) {
      setTheme(darkTheme);
      setCookiePreferences({ useDarkTheme: true });
    } else {
      setTheme(lightTheme);
      setCookiePreferences({ useDarkTheme: false });
    }
  };

  const contextValues = {
    theme,
    swapTheme,
    themeIsDark: theme === darkTheme,
  };

  return (
    <ThemeContext.Provider value={contextValues}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return { ...context };
}
