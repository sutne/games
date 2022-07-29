import { ThemeProvider, useMediaQuery } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import { darkTheme, lightTheme } from "./themes";
import { games } from "./game-list";
import { Main } from "./pages/main/main";
import { Scoreboard } from "./pages/scoreboard/scoreboard";

function App() {
  const useDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useDarkMode ? darkTheme : lightTheme;

  document.body.style.background = theme.palette.background.default;
  document.body.style.color = theme.palette.text.primary;

  return (
    <React.StrictMode>
      <div className="content">
        <div className="wrapper">
          <ThemeProvider theme={theme}>
            <HashRouter>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/scoreboard" element={<Scoreboard />} />
                {games.map((game) => {
                  if (game.disabled) return <></>;
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
          </ThemeProvider>
        </div>
      </div>
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<App />);
