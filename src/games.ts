import minesweeperImage from "assets/minesweeper.png";
import pacmanImage from "assets/pacman.png";
import snakeImage from "assets/snake.jpeg";
// import sudokuImage from "assets/sudoku.png";
import tetrisImage from "assets/tetris.jpeg";
import { Minesweeper } from "pages/minesweeper";

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
    description: "Clear the board of all tiles without stepping on a mine.",
    image: minesweeperImage,
    element: Minesweeper,
    isAvailable: true,
  },
  {
    name: "Tetris",
    description: "Classic Minesweeper game with difficulties",
    image: tetrisImage,
    element: Minesweeper,
    isAvailable: false,
  },
  {
    name: "Snake",
    description: "Classic Minesweeper game with difficulties",
    image: snakeImage,
    element: Minesweeper,
    isAvailable: false,
  },
  {
    name: "Pac-Man",
    description: "Classic Minesweeper game with difficulties",
    image: pacmanImage,
    element: Minesweeper,
    isAvailable: false,
  },
  // {
  //   name: "Sudoku",
  //   description: "Classic Minesweeper game with difficulties",
  //   image: sudokuImage,
  //   element: Minesweeper,
  //   isAvailable: false,
  // },
  // {
  //   name: "Memory",
  //   description: "Classic Minesweeper game with difficulties",
  //   image: minesweeperImage,
  //   element: Minesweeper,
  //   isAvailable: false,
  // },
  // {
  //   name: "TicTacToe",
  //   description: "VS AI",
  //   image: minesweeperImage,
  //   element: Minesweeper,
  //   isAvailable: false,
  // },
  // {
  //   name: "ConnectBorderStuff",
  //   description: "Vs AI",
  //   image: minesweeperImage,
  //   element: Minesweeper,
  //   isAvailable: false,
  // },
  // {
  //   name: "Chess",
  //   description: "Vs AI",
  //   image: minesweeperImage,
  //   element: Minesweeper,
  //   isAvailable: false,
  // },
];
