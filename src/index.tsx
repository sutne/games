import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

function App() {
  const useDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useDarkMode ? darkTheme : lightTheme;

  document.body.style.background = theme.palette.background.default;
  document.body.style.margin = "0";
  document.body.style.color = theme.palette.text.primary;

  const style = {
    content: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    wrapper: {
      width: "min(1024px, 100%)",
      minHeight: "100vh",
      background: "rgba(0,0,255,0.1)",
    },
  };

  return (
    <div style={style.content}>
      <div style={style.wrapper}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/games" element={<Main />} />
              <Route path="/scoreboard" element={<Scoreboard />} />
              {games.map((game) => (
                <Route
                  key={game.name}
                  path={"/games/" + game.name}
                  element={game.element}
                />
              ))}
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
