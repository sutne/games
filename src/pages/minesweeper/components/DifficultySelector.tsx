import React from "react";
import { Box, Button } from "@mui/material";

import { Difficulty } from "../logic";

export type DifficultyProps = {
  setDifficulty: React.Dispatch<React.SetStateAction<Difficulty | undefined>>;
};

export function DifficultySelector({ setDifficulty }: DifficultyProps) {
  return (
    <Box textAlign="center">
      <Button onClick={() => setDifficulty(Difficulty.BEGINNER)}>
        Beginner
      </Button>
      <Button onClick={() => setDifficulty(Difficulty.INTERMEDIATE)}>
        Intermediate
      </Button>
      <Button onClick={() => setDifficulty(Difficulty.EXPERT)}>Expert</Button>
    </Box>
  );
}
