import { Minesweeper } from "../pages/minesweeper/minesweeper";
import minesweeperImage from "./minesweeper.png";

import tetrisImage from "./tetris.jpeg";
import pacmanImage from "./pacman.png";
import snakeImage from "./snake.jpeg";
import sudokuImage from "./sudoku.png";

export type Game = {
  name: string;
  description: string;
  image: any;
  element: () => JSX.Element;
  disabled: boolean;
};

export const games: Game[] = [
  {
    name: "Minesweeper",
    description:
      "Dodge the bombs in this classic game. Comes in three difficulties.",
    image: minesweeperImage,
    element: Minesweeper,
    disabled: false,
  },
  {
    name: "Snake",
    description: "Classic Minesweeper game with difficulties",
    image: snakeImage,
    element: Minesweeper,
    disabled: true,
  },
  {
    name: "Pac-Man",
    description: "Classic Minesweeper game with difficulties",
    image: pacmanImage,
    element: Minesweeper,
    disabled: true,
  },
  {
    name: "Tetris",
    description: "Classic Minesweeper game with difficulties",
    image: tetrisImage,
    element: Minesweeper,
    disabled: true,
  },
  {
    name: "Sudoku",
    description: "Classic Minesweeper game with difficulties",
    image: sudokuImage,
    element: Minesweeper,
    disabled: true,
  },
  {
    name: "Other",
    description: "Classic Minesweeper game with difficulties",
    image: minesweeperImage,
    element: Minesweeper,
    disabled: true,
  },
];
