import React from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";

import { RouteNotFound } from "components/404";
import { NavBar } from "components/NavBar";
import { AuthProvider, ThemeProvider } from "components/providers";
import { games } from "games";
import { Main } from "pages/main/Main";
import { Anonymous } from "pages/profile/Anonymous";
import { CreateUser } from "pages/profile/CreateUser";
import { Profile } from "pages/profile/Profile";
import { SignIn } from "pages/profile/SignIn";
import { Upgrade } from "pages/profile/Upgrade";
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
                <Route path="/profile/sign-in" element={<SignIn />} />
                <Route path="/profile/create-user" element={<CreateUser />} />
                <Route path="/profile/anonymous" element={<Anonymous />} />
                <Route path="/profile/upgrade" element={<Upgrade />} />
                {enabledGames.map((game) => {
                  return (
                    <Route
                      key={game.name}
                      path={`/${game.name}`}
                      element={<game.element />}
                    />
                  );
                })}
                <Route path="/404" element={<RouteNotFound />} />
                <Route path="*" element={<Navigate replace to="/404" />} />
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
