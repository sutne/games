import { Minesweeper } from "pages/minesweeper/Minesweeper";
import minesweeperImage from "assets/minesweeper.png";

import tetrisImage from "assets/tetris.jpeg";
import pacmanImage from "assets/pacman.png";
import snakeImage from "assets/snake.jpeg";
import sudokuImage from "assets/sudoku.png";

export type Game = {
  name: string;
  description: string;
  image: any;
  element: () => JSX.Element;
  isAvailable: boolean;
};

export const games: Game[] = [
  {
    name: "Minesweeper",
    description:
      "Dodge the bombs in this classic game. Comes in three difficulties.",
    image: minesweeperImage,
    element: Minesweeper,
    isAvailable: false,
  },
  {
    name: "Snake",
    description: "Classic Minesweeper game with difficulties",
    image: snakeImage,
    element: Minesweeper,
    isAvailable: true,
  },
  {
    name: "Pac-Man",
    description: "Classic Minesweeper game with difficulties",
    image: pacmanImage,
    element: Minesweeper,
    isAvailable: true,
  },
  {
    name: "Tetris",
    description: "Classic Minesweeper game with difficulties",
    image: tetrisImage,
    element: Minesweeper,
    isAvailable: true,
  },
  {
    name: "Sudoku",
    description: "Classic Minesweeper game with difficulties",
    image: sudokuImage,
    element: Minesweeper,
    isAvailable: true,
  },
  {
    name: "Human Benchmark",
    description: "Classic Minesweeper game with difficulties",
    image: minesweeperImage,
    element: Minesweeper,
    isAvailable: true,
  },
  {
    name: "TicTacToe",
    description: "VS AI",
    image: minesweeperImage,
    element: Minesweeper,
    isAvailable: true,
  },
  {
    name: "ConnectBorderStuff",
    description: "Vs AI",
    image: minesweeperImage,
    element: Minesweeper,
    isAvailable: true,
  },
  {
    name: "Chess",
    description: "Vs AI",
    image: minesweeperImage,
    element: Minesweeper,
    isAvailable: true,
  },
];
