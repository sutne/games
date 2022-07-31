import {
  Button,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import { darkTheme, lightTheme } from "./themes";
import { games } from "./game-list";
import { Main } from "./pages/main/main";
import { Scoreboard } from "./pages/scoreboard/scoreboard";

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
            <Button style={{ position: "absolute" }} onClick={swapTheme}>
              Swap Theme
            </Button>
            <HashRouter>
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
