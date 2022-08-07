import React from "react";
import { useNavigate } from "react-router-dom";
import * as Icons from "@mui/icons-material";
import { AppBar, Button, IconButton, Toolbar } from "@mui/material";
import { Box } from "@mui/system";

import { useAuth } from "pages/hooks/AuthProvider";
import { useTheme } from "pages/hooks/ThemeProvider";

export function NavBar() {
  const navigate = useNavigate();
  const { swapTheme, themeIsDark } = useTheme();
  const { user } = useAuth();

  const classes = getClasses();
  return (
    <AppBar position="static" sx={classes.navbar}>
      <Toolbar>
        <IconButton size="large" onClick={() => navigate("/")}>
          <Icons.Home />
        </IconButton>
        {user.isSignedIn ? (
          <IconButton size="large" onClick={() => navigate("/stats")}>
            <Icons.EmojiEvents />
          </IconButton>
        ) : (
          <></>
        )}
        <Box sx={{ flex: "1" }} />
        {user.isSignedIn ? (
          <Button
            sx={{ color: "text.secondary", textTransform: "none" }}
            size="large"
            endIcon={<Icons.AccountCircle />}
            onClick={() => navigate("/profile")}
          >
            {user.username}
          </Button>
        ) : (
          <IconButton size="large" onClick={() => navigate("/profile")}>
            <Icons.AccountCircleOutlined />
          </IconButton>
        )}
        <IconButton size="large" onClick={swapTheme}>
          {themeIsDark ? <Icons.LightbulbOutlined /> : <Icons.Lightbulb />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );

  function getClasses() {
    return {
      navbar: {
        marginBottom: "32px",
        backgroundColor: "background.paper",
        borderRadius: "12px",
        boxShadow: 5,
        textAlign: "center",
      },
    };
  }
}
