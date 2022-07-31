import { Box, Button, Typography } from "@mui/material";

import "./minesweeper.css";
import { Difficulty } from "./logic";
import { Board } from "./components/board";
import { useState } from "react";
import { GameProvider } from "./components/game-provider";

export function Minesweeper() {
  const [difficulty, setDifficulty] = useState<Difficulty>();

  return (
    <Box className="minesweeper-container">
      <Typography variant="h3">Minesweeper</Typography>
      <Content />
    </Box>
  );

  function Content() {
    if (difficulty === undefined) {
      return (
        <Box textAlign="center">
          <Button onClick={() => setDifficulty(Difficulty.BEGINNER)}>
            Beginner
          </Button>
          <Button onClick={() => setDifficulty(Difficulty.INTERMEDIATE)}>
            Intermediate
          </Button>
          <Button onClick={() => setDifficulty(Difficulty.EXPERT)}>
            Expert
          </Button>
        </Box>
      );
    }
    return (
      <GameProvider difficulty={difficulty}>
        <Board />
      </GameProvider>
    );
  }
}
