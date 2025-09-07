import {
  ThemeProvider as MuiThemeProvider,
  type Theme,
  useMediaQuery,
} from '@mui/material';
import React, { useState } from 'react';
import {
  getCookiePreferences,
  setCookiePreferences,
} from 'services/preferences';
import { darkTheme, lightTheme } from 'themes';

type props = {
  children: React.ReactNode;
};
const ThemeContext = React.createContext<
  | {
      theme: Theme;
      swapTheme: () => void;
      themeIsDark: boolean;
      isPhone: boolean;
    }
  | undefined
>(undefined);
export function ThemeProvider({ children }: props) {
  const prefersDarkTheme = useMediaQuery('(prefers-color-scheme: dark)');
  const preferences = getCookiePreferences({
    useDarkTheme: prefersDarkTheme,
  });
  const [theme, setTheme] = useState(
    preferences.useDarkTheme ? darkTheme : lightTheme,
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
    isPhone: useMediaQuery(theme.breakpoints.down('sm')),
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
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return { ...context };
}
