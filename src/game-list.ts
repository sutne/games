import { Minesweeper } from "./pages/minesweeper/minesweeper";
import minesweeperImage from "./assets/minesweeper.png";

import tetrisImage from "./assets/tetris.jpeg";
import pacmanImage from "./assets/pacman.png";
import snakeImage from "./assets/snake.jpeg";
import sudokuImage from "./assets/sudoku.png";

export const games = [
  {
    name: "Minesweeper",
    description:
      "Classic Minesweeper game with difficulties sweeper game with difficulties",
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
