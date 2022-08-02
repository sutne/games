import { Home, Lightbulb, LightbulbOutlined } from "@mui/icons-material";
import { Button, useTheme } from "@mui/material";
import { Theme } from "@mui/material";
import { SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { setPrefs } from "services/cookies";
import { darkTheme, lightTheme } from "themes";

import "./NavBar.css";
type NavBarProps = {
  setTheme: React.Dispatch<SetStateAction<Theme>>;
};

export function NavBar({ setTheme }: NavBarProps) {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <div
      className="navbar"
      style={{ background: theme.palette.background.paper }}
    >
      <Button onClick={() => navigate("/")}>
        <Home />
      </Button>
      <Button onClick={swapTheme}>
        {theme === lightTheme ? <Lightbulb /> : <LightbulbOutlined />}
      </Button>
    </div>
  );

  function swapTheme() {
    if (theme === lightTheme) {
      setTheme(darkTheme);
      setPrefs({ useDarkTheme: true });
    } else {
      setTheme(lightTheme);
      setPrefs({ useDarkTheme: false });
    }
  }
}
