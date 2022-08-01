import { Minesweeper } from "./pages/minesweeper/Minesweeper";
import minesweeperImage from "./assets/minesweeper.png";

import tetrisImage from "./assets/tetris.jpeg";
import pacmanImage from "./assets/pacman.png";
import snakeImage from "./assets/snake.jpeg";
import sudokuImage from "./assets/sudoku.png";

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
    name: "Human Benchmark",
    description: "Classic Minesweeper game with difficulties",
    image: minesweeperImage,
    element: Minesweeper,
    disabled: true,
  },
  {
    name: "TicTacToe",
    description: "VS AI",
    image: minesweeperImage,
    element: Minesweeper,
    disabled: true,
  },
  {
    name: "ConnectBorderStuff",
    description: "Vs AI",
    image: minesweeperImage,
    element: Minesweeper,
    disabled: true,
  },
  {
    name: "Chess",
    description: "Vs AI",
    image: minesweeperImage,
    element: Minesweeper,
    disabled: true,
  },
];
