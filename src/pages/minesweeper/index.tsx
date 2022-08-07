import React from "react";

import { GameHeader } from "pages/components/GameHeader";

import { DifficultySelector } from "./components/DifficultySelector";
import { GameArea } from "./components/GameArea";
import {
  MinesweeperProvider,
  useMinesweeper,
} from "./hooks/MinesweeperProvider";

export default function Minesweeper() {
  return (
    <>
      <GameHeader game="Minesweeper" />
      <MinesweeperProvider>
        <Content />
      </MinesweeperProvider>
    </>
  );
}

function Content() {
  const { game } = useMinesweeper();
  return game ? <GameArea /> : <DifficultySelector />;
}
