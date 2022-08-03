import { Home, Lightbulb, LightbulbOutlined } from "@mui/icons-material";
import { Box, Button, useTheme } from "@mui/material";
import { Theme } from "@mui/material";
import { SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { setPrefs } from "services/cookies";
import { darkTheme, lightTheme } from "themes";

type NavBarProps = {
  setTheme: React.Dispatch<SetStateAction<Theme>>;
};

export function NavBar({ setTheme }: NavBarProps) {
  const navigate = useNavigate();
  const theme = useTheme();
  const classes = getStyle();

  return (
    <Box sx={classes.navbar}>
      <Button onClick={() => navigate("/")}>
        <Home />
      </Button>
      <Button onClick={swapTheme}>
        {theme === lightTheme ? <Lightbulb /> : <LightbulbOutlined />}
      </Button>
    </Box>
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

function getStyle() {
  return {
    navbar: {
      position: "absolute",
      padding: "12px",
      backgroundColor: "background.paper",
      width: "inherit",
      borderRadius: "0 0 12px 12px",
      boxShadow: 5,
    },
  };
}
