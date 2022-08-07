import React from "react";
import { Typography } from "@mui/material";

type props = {
  game: string;
};
export function GameHeader({ game }: props) {
  const classes = getClasses();
  return (
    <Typography variant="h3" sx={classes.title}>
      {game}
    </Typography>
  );

  function getClasses() {
    return {
      title: {
        textAlign: "center",
        paddingBottom: "12px",
      },
    };
  }
}
