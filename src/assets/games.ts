import dunesDark from 'assets/dark/dunes.png';
import minesweeperDark from 'assets/dark/minesweeper.png';
import minesweeperLight from 'assets/light/minesweeper.png';
import { Dunes } from 'pages/dunes/Dunes';
import { Minesweeper } from 'pages/minesweeper/Minesweeper';
import type { JSX } from 'react';

export type GameListEntry = {
  name: string;
  description: string;
  image: {
    light: string;
    dark: string;
  };
  element: () => JSX.Element;
  isAvailable: boolean;
};

export const games: GameListEntry[] = [
  {
    name: 'Minesweeper',
    description: 'Locate all the mines.',
    image: {
      light: minesweeperLight,
      dark: minesweeperDark,
    },
    element: Minesweeper,
    isAvailable: true,
  },
  {
    name: 'Dunes',
    description: 'Relaxing sand simulation.',
    image: {
      light: dunesDark,
      dark: dunesDark,
    },
    element: Dunes,
    isAvailable: true,
  },
  // {
  //   name: "Tetris",
  //   description: "...",
  //   image: {
  //     light: tetrisImage,
  //     dark: tetrisImage,
  //   },
  //   element: Tetris,
  //   isAvailable: false,
  // },
  // {
  //   name: "Snake",
  //   description: "...",
  //   image: {
  //     light: snakeImage,
  //     dark: snakeImage,
  //   },
  //   element: Minesweeper,
  //   isAvailable: false,
  // },
  // {
  //   name: "Pac-Man",
  //   description: "...",
  //   image: {
  //     light: pacmanImage,
  //     dark: pacmanImage,
  //   },
  //   element: Minesweeper,
  //   isAvailable: false,
  // },
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
