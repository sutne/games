import {
  Card,
  Box,
  Grid,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  ThemeProvider,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import Minesweeper from "./minesweeper";
import minesweeperImage from "../assets/minesweeper.png";
import tetrisImage from "../assets/tetris.jpeg";
import pacmanImage from "../assets/pacman.png";
import snakeImage from "../assets/snake.jpeg";
import sudokuImage from "../assets/sudoku.png";

const games = [
  {
    name: "Minesweeper",
    description: "Classic Minesweeper game with difficulties",
    image: minesweeperImage,
    element: <Minesweeper />,
  },
  {
    name: "Snake",
    description: "Classic Minesweeper game with difficulties",
    image: snakeImage,
    element: <Minesweeper />,
  },
  {
    name: "Pac-Man",
    description: "Classic Minesweeper game with difficulties",
    image: pacmanImage,
    element: <Minesweeper />,
  },
  {
    name: "Tetris",
    description: "Classic Minesweeper game with difficulties",
    image: tetrisImage,
    element: <Minesweeper />,
  },
  {
    name: "Sudoku",
    description: "Classic Minesweeper game with difficulties",
    image: sudokuImage,
    element: <Minesweeper />,
  },
  {
    name: "Other",
    description: "Classic Minesweeper game with difficulties",
    image: minesweeperImage,
    element: <Minesweeper />,
  },
];

function Main() {
  return (
    <>
      <Box sx={{ marginY: "64px", marginX: "32px" }}>
        <Typography variant="h1" align="center">
          Hello there
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Want to enjoy some minamilistic games without any ads or distractions,
          then you have come to the right place!
        </Typography>
      </Box>
      <Box sx={{ marginX: "64px" }}>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          {games.map((game) => (
            <Grid item>{GameCard(game)}</Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

function GameCard(game) {
  const cardStyle = {
    width: 325,
    borderRadius: 20,
    // "&:hover": {
    //   transform: "scale(2)",
    //   transition: "1s linear",
    // },
  };
  const imageBoxStyle = {
    height: "140px",
    width: "100%",
    overflow: "hidden",
  };
  const imageStyle = {
    transform: "scale(2) rotate(-17deg)",
  };
  const contentStyle = {
    padding: 0,
    background: "rgb(40, 50, 65)",
  };
  const textBoxStyle = {
    padding: "16px",
  };

  return (
    <Card style={cardStyle}>
      <CardContent style={contentStyle}>
        <CardActionArea component={Link} to={"/games/" + game.name}>
          <Box style={imageBoxStyle}>
            <CardMedia
              component="img"
              image={game.image}
              alt={game.image}
              style={imageStyle}
            />
          </Box>
          <Box style={textBoxStyle}>
            <Typography gutterBottom variant="h5" component="div">
              {game.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {game.description}
            </Typography>
          </Box>
        </CardActionArea>
      </CardContent>
    </Card>
  );
}

export { Main, games };
