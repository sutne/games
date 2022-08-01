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

function App() {
  const enabledGames = games.filter((game) => !game.disabled);

  const prefersDarkTheme = useMediaQuery("(prefers-color-scheme: dark)");
  const [theme, setTheme] = useState(prefersDarkTheme ? darkTheme : lightTheme);

  function swapTheme() {
    if (theme === lightTheme) setTheme(darkTheme);
    else setTheme(lightTheme);
  }

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
              <NavBar swapTheme={swapTheme} />
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
