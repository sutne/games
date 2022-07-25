import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, useMediaQuery } from "@material-ui/core";

import "./style.css";
import { Main, games } from "./pages/main";
import { darkTheme, lightTheme } from "./themes";

function App() {
  const useDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useDarkMode ? darkTheme : lightTheme;

  const backgroundStyle = {
    backgroundColor: theme.palette.background,
    color: theme.palette.text,
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  };
  const wrapperStyle = {
    maxWidth: "1200px",
    minHeight: "100vh",
    border: "1px solid rgb(27, 29, 42)",
    backgroundColor: "rgb(19, 23, 35)",
  };

  return (
    <div style={backgroundStyle}>
      <ThemeProvider theme={theme}>
        <div style={wrapperStyle}>
          <BrowserRouter>
            <Routes>
              <Route path="/games" element={<Main />} />
              {games.map((game) => (
                <Route path={"/games/" + game.name} element={game.element} />
              ))}
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
