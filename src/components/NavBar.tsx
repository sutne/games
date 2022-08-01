import { Home, Lightbulb } from "@mui/icons-material";
import { Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

import "./NavBar.css";
type NavBarProps = {
  swapTheme: () => void;
};

export function NavBar({ swapTheme }: NavBarProps) {
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
        <Lightbulb />
      </Button>
    </div>
  );
}
