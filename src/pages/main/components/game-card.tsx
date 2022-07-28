import { Link } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";

import "./game-card.css";
import { Game } from "../../../assets/game-list";

export function GameCard(props: Game) {
  const theme = useTheme();
  const colors = {
    gameCard: {
      background: props.disabled
        ? theme.palette.background.disabled
        : theme.palette.background.paper,
    },
    link: {
      color: theme.palette.text.primary,
    },
    description: {
      color: props.disabled ? theme.game.red : theme.palette.text.primary,
      fontWeight: props.disabled ? "bold" : "",
    },
  };

  return (
    <div
      className={`game-card ${props.disabled ? "disabled" : ""}`}
      style={colors.gameCard}
    >
      <Link
        to={props.disabled ? "" : `/games/${props.name}`}
        className="link"
        style={colors.link}
      >
        <Box className="image-box" component="div">
          <img src={props.image} alt={props.image} className="image" />
        </Box>
        <Box className="text-box">
          <Typography variant="h5">{props.name}</Typography>
          <Typography
            className="description"
            variant="body1"
            style={colors.description}
          >
            {props.disabled ? "Under Construction" : props.description}
          </Typography>
        </Box>
      </Link>
    </div>
  );
}
