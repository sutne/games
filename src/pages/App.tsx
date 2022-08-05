import React, { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Box, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";

import { games } from "games";
import { NavBar } from "pages/components/NavBar";
import { Main } from "pages/main/Main";
import { Stats } from "pages/stats/Stats";
import { getCookiePreferences } from "services/preferences";
import { darkTheme, lightTheme } from "themes";

export function App() {
  // Load preferences from cookies and set theme accordingly
  const prefersDarkTheme = useMediaQuery("(prefers-color-scheme: dark)");
  const preferences = getCookiePreferences({ useDarkTheme: prefersDarkTheme });
  const [theme, setTheme] = useState(
    preferences.useDarkTheme ? darkTheme : lightTheme
  );
  const enabledGames = games.filter((game) => !game.isAvailable);

  const classes = getClasses();
  return (
    <ThemeProvider theme={theme}>
      <Box sx={classes.content}>
        <Box sx={classes.wrapper}>
          <CssBaseline />
          <HashRouter>
            <NavBar setTheme={setTheme} />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/stats" element={<Stats />} />
              {enabledGames.map((game) => {
                return (
                  <Route
                    key={game.name}
                    path={`/${game.name}`}
                    element={<game.element />}
                  />
                );
              })}
            </Routes>
          </HashRouter>
        </Box>
      </Box>
    </ThemeProvider>
  );

  function getClasses() {
    return {
      content: {
        width: "100%",
        backgroundColor: "background.default",
        color: "text.primary",
        WebKitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      },
      wrapper: {
        width: "min(1024px, 100%)",
        margin: "0 auto",
        padding: "12px 24px 24px 24px",
      },
    };
  }
}
