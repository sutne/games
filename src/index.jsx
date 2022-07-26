import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, useMediaQuery } from "@material-ui/core";

import { games } from "./games";
import { Main } from "./pages/main";
import { darkTheme, lightTheme } from "./themes";

function App() {
  const useDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useDarkMode ? darkTheme : lightTheme;

  document.body.style.background = theme.palette.myBackground;
  document.body.style.margin = 0;
  document.body.style.color = theme.palette.myText;

  const contentStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  const wrapperStyle = {
    maxWidth: "1200px",
    minHeight: "100vh",
    backgroundColor: theme.palette.myWrapperBackground,
    borderColor: theme.palette.myWrapperBorder,
    borderStyle: "solid",
    borderWidth: "0 3px 0 3px",
  };

  return (
    <div style={contentStyle}>
      <div style={wrapperStyle}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/games" element={<Main />} />
              {games.map((game) => (
                <Route path={"/games/" + game.name} element={game.element} />
              ))}
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
