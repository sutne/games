import React from "react";
import { Box, Button, Typography } from "@mui/material";

import { Difficulty } from "../logic";

export type DifficultyProps = {
  setDifficulty: React.Dispatch<React.SetStateAction<Difficulty | undefined>>;
};

export function DifficultySelector({ setDifficulty }: DifficultyProps) {
  const classes = getClasses();
  return (
    <Box sx={classes.container}>
      <Typography variant="h5" sx={classes.description}>
        Select Difficulty
      </Typography>
      <Button onClick={() => setDifficulty(Difficulty.BEGINNER)}>
        Beginner
      </Button>
      <Button onClick={() => setDifficulty(Difficulty.INTERMEDIATE)}>
        Intermediate
      </Button>
      <Button onClick={() => setDifficulty(Difficulty.EXPERT)}>Expert</Button>
    </Box>
  );

  function getClasses() {
    return {
      container: {
        textAlign: "center",
      },
      description: {
        width: "100%",
      },
    };
  }
}
