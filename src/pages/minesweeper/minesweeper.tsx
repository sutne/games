import React, { useState } from "react";
import { Typography } from "@mui/material";

import { DifficultySelector } from "./components/DifficultySelector";
import { GameArea } from "./components/GameArea";
import { GameProvider } from "./hooks/GameProvider";
import { Difficulty } from "./logic";

export function Minesweeper() {
  const [difficulty, setDifficulty] = useState<Difficulty | undefined>();

  const classes = getClasses();
  return (
    <>
      <Typography variant="h3" sx={classes.title}>
        Minesweeper
      </Typography>
      {difficulty === undefined ? (
        <DifficultySelector {...{ setDifficulty }} />
      ) : (
        <GameProvider difficulty={difficulty}>
          <GameArea {...{ setDifficulty }} />
        </GameProvider>
      )}
    </>
  );

  function getClasses() {
    return {
      title: {
        textAlign: "center",
      },
    };
  }
}
