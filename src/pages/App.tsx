import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";

import { games } from "games";
import { NavBar } from "pages/components/NavBar";
import { AuthProvider } from "pages/hooks/AuthProvider";
import { ThemeProvider } from "pages/hooks/ThemeProvider";
import { Main } from "pages/main/Main";
import { Profile } from "pages/profile";
import { Stats } from "pages/stats/Stats";

export function App() {
  // Load preferences from cookies and set theme accordingly
  const enabledGames = games.filter((game) => game.isAvailable);

  const classes = getClasses();
  return (
    <ThemeProvider>
      <AuthProvider>
        <Box sx={classes.content}>
          <Box sx={classes.wrapper}>
            <CssBaseline />
            <HashRouter>
              <NavBar />
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/stats" element={<Stats />} />
                <Route path="/profile" element={<Profile />} />
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
      </AuthProvider>
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
