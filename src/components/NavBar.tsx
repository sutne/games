import {
  Home,
  Lightbulb,
  LightbulbOutlined,
  Login,
  Person,
} from "@mui/icons-material";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { Theme } from "@mui/material";
import { SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setPrefs } from "services/cookies";
import { darkTheme, lightTheme } from "themes";

type NavBarProps = {
  setTheme: React.Dispatch<SetStateAction<Theme>>;
  title?: string;
};

export function NavBar({ setTheme, title }: NavBarProps) {
  const navigate = useNavigate();
  const theme = useTheme();
  const classes = getStyle();

  const [auth, setAuth] = useState(false);

  return (
    <AppBar position="static" sx={classes.navbar}>
      <Toolbar>
        <IconButton size="large" onClick={() => navigate("/")}>
          <Home />
        </IconButton>
        <Typography variant="h5" flex={1}>
          {title}
        </Typography>
        <IconButton size="large" onClick={() => setAuth((auth) => !auth)}>
          {auth ? <Person /> : <Login />}
        </IconButton>
        <IconButton size="large" onClick={swapTheme}>
          {theme === lightTheme ? <Lightbulb /> : <LightbulbOutlined />}
        </IconButton>
      </Toolbar>
    </AppBar>
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

//------------------------------------------------------------------------------

function getStyle() {
  return {
    navbar: {
      margin: "12px auto",
      width: "90%",
      backgroundColor: "background.paper",
      color: "text.primary",
      borderRadius: "12px",
      boxShadow: 5,
      textAlign: "center",
    },
  };
}
