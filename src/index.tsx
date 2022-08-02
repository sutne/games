import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
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
  const enabledGames = games.filter((game) => !game.disabled);

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <div
          className="content"
          style={{
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
          }}
        >
          <div className="wrapper">
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
          </div>
        </div>
      </ThemeProvider>
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<App />);
