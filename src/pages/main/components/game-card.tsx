import { Link } from "react-router-dom";
import { Box, makeStyles, Typography, useTheme } from "@material-ui/core";

import "./game-card.css";
import { Game } from "../../../assets/game-list";

const useStyles = makeStyles((theme) => ({
  gameCard: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export function GameCard(props: Game) {
  const classes = useStyles();

  return (
    <div className={classes.gameCard}>
      <Link to={"/games/" + props.name} className="link">
        <Box className="imageBox" component="div">
          <img src={props.image} alt={props.image} className="image" />
        </Box>
        <Box className="textBox">
          <Typography variant="h5">{props.name}</Typography>
          <Typography className="description" variant="body1">
            {props.description}
          </Typography>
        </Box>
      </Link>
    </div>
  );
}
