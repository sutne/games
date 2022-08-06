import React from "react";
import { Box, Button, Typography } from "@mui/material";

import { useMinesweeper } from "../hooks/MinesweeperProvider";
import { MinesweeperDifficulty } from "../minesweeper";

export function DifficultySelector() {
  const { setDifficulty } = useMinesweeper();
  const classes = getClasses();
  return (
    <Box sx={classes.container}>
      <Typography variant="h5" sx={classes.description}>
        Select Difficulty
      </Typography>
      <Button onClick={() => setDifficulty(MinesweeperDifficulty.BEGINNER)}>
        Beginner
      </Button>
      <Button onClick={() => setDifficulty(MinesweeperDifficulty.INTERMEDIATE)}>
        Intermediate
      </Button>
      <Button onClick={() => setDifficulty(MinesweeperDifficulty.EXPERT)}>
        Expert
      </Button>
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
