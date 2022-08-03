import { Box, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import { darkTheme, lightTheme } from "./themes";
import { games } from "./games";
import { Main } from "./pages/main/Main";
import { Scoreboard } from "./pages/scoreboard/scoreboard";
import { NavBar } from "./components/NavBar";
import { getPrefs } from "services/cookies";

function App() {
  // Load preferences from cookies and set theme accordingly
  const prefersDarkTheme = useMediaQuery("(prefers-color-scheme: dark)");
  const prefs = getPrefs({ useDarkTheme: prefersDarkTheme });
  let useDark = prefs.useDarkTheme === true;
  const [theme, setTheme] = useState(useDark ? darkTheme : lightTheme);
  const enabledGames = games.filter((game) => !game.isAvailable);

  const classes = getStyle();

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Box sx={classes.content}>
          <Box sx={classes.wrapper}>
            <CssBaseline />
            <HashRouter>
              <NavBar setTheme={setTheme} />
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/scoreboard" element={<Scoreboard />} />
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
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<App />);

//------------------------------------------------------------------------------

function getStyle() {
  return {
    content: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      transition: "all ease 0.3s",
      backgroundColor: "background.default",
      color: "text.primary",
    },
    wrapper: {
      width: "min(1024px, 100%)",
      minHeight: "100vh",
    },
  };
}
