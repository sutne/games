import React, { SetStateAction } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

import { Card } from "components/cards";

import { Difficulty } from "../logic/difficulty";

type props = {
  setDifficulty: React.Dispatch<SetStateAction<Difficulty | undefined>>;
};
export function DifficultySelector({ setDifficulty }: props) {
  const classes = getClasses();
  return (
    <Card>
      <Box sx={classes.container}>
        <Typography variant="h5">Select Difficulty</Typography>
        <Stack
          sx={classes.buttons}
          direction={{ xs: "column", sm: "row" }}
          textAlign="center"
        >
          <Button onClick={() => setDifficulty("beginner")}>Beginner</Button>
          <Button onClick={() => setDifficulty("intermediate")}>
            Intermediate
          </Button>
          <Button onClick={() => setDifficulty("expert")}>Expert</Button>
        </Stack>
      </Box>
    </Card>
  );

  function getClasses() {
    return {
      container: {
        textAlign: "center",
      },
      buttons: {
        maxWidth: "300px",
        margin: "0 auto",
      },
    };
  }
}
