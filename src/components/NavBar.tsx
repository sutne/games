import React, { SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Icons from "@mui/icons-material";
import {
  AppBar,
  IconButton,
  Theme,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";

import { setCookiePreferences } from "services/preferences";
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
          <Icons.Home />
        </IconButton>
        <IconButton size="large" onClick={() => navigate("/stats")}>
          <Icons.EmojiEvents />
        </IconButton>
        <Typography variant="h5" flex={1}>
          {title}
        </Typography>
        <IconButton size="large" onClick={() => setAuth((auth) => !auth)}>
          {auth ? <Icons.Person /> : <Icons.Login />}
        </IconButton>
        <IconButton size="large" onClick={swapTheme}>
          {theme === lightTheme ? (
            <Icons.Lightbulb />
          ) : (
            <Icons.LightbulbOutlined />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );

  function swapTheme() {
    if (theme === lightTheme) {
      setTheme(darkTheme);
      setCookiePreferences({ useDarkTheme: true });
    } else {
      setTheme(lightTheme);
      setCookiePreferences({ useDarkTheme: false });
    }
  }
}

//------------------------------------------------------------------------------

function getStyle() {
  return {
    navbar: {
      marginBottom: "32px",
      backgroundColor: "background.paper",
      color: "text.primary",
      borderRadius: "12px",
      boxShadow: 5,
      textAlign: "center",
    },
  };
}
