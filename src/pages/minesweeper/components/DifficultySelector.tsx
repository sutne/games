import React, { SetStateAction } from "react";
import { Box, Button, Typography } from "@mui/material";

import { Difficulty } from "../logic";

type props = {
  setDifficulty: React.Dispatch<SetStateAction<Difficulty | undefined>>;
};
export function DifficultySelector({ setDifficulty }: props) {
  const classes = getClasses();
  return (
    <Box sx={classes.container}>
      <Typography variant="h5" sx={classes.description}>
        Select Difficulty
      </Typography>
      <Button onClick={() => setDifficulty("beginner")}>Beginner</Button>
      <Button onClick={() => setDifficulty("intermediate")}>
        Intermediate
      </Button>
      <Button onClick={() => setDifficulty("expert")}>Expert</Button>
    </Box>
  );

  function getClasses() {
    return {
      container: {
        textAlign: "center",
      },
      description: {
        // width: "100%",
      },
    };
  }
}
