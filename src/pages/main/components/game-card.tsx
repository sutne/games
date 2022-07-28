import { Link } from "react-router-dom";
import { Box, Typography, useTheme } from "@material-ui/core";

import "./game-card.css";
import { Game } from "../../../assets/game-list";

export function GameCard(props: Game) {
  const theme = useTheme();
  const colors = {
    gameCard: {
      background: theme.palette.background.paper,
    },
    link: {
      color: theme.palette.text.primary,
    },
  };

  return (
    <div className={"game-card"} style={colors.gameCard}>
      <Link to={"/games/" + props.name} className="link" style={colors.link}>
        <Box className="image-box" component="div">
          <img src={props.image} alt={props.image} className="image" />
        </Box>
        <Box className="text-box">
          <Typography variant="h5">{props.name}</Typography>
          <Typography className="description" variant="body1">
            {props.description}
          </Typography>
        </Box>
      </Link>
    </div>
  );
}
