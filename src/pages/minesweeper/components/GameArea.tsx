import React from "react";
import { Replay } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";

import { useGame } from "../hooks/GameProvider";
import { Game } from "../logic";
import { Board } from "./Board";
import { DifficultyProps } from "./DifficultySelector";

export function GameArea({ setDifficulty }: DifficultyProps) {
  const [game, setGame] = useGame();

  const classes = getClasses();
  if (!game.isOver()) {
    return (
      <>
        <Typography
          variant="h5"
          sx={classes.remainingFlags}
        >{`${game.numRemainingFlags} 🚩 Remaining`}</Typography>
        <Board />
      </>
    );
  } else {
    return (
      <>
        <Board />
        <Typography variant="body1">
          {game.isWon ? "You Won!" : "You Lost :("}
        </Typography>
        <Typography variant="body1">Score: {game.getScore()}</Typography>
        <Button onClick={() => setGame(new Game(game.difficulty))}>
          <Replay />
        </Button>
        <Button onClick={() => setDifficulty(undefined)}>
          Change Difficulty
        </Button>{" "}
      </>
    );
  }

  function getClasses() {
    return {
      remainingFlags: {
        textAlign: "center",
        padding: "12px",
        fontWeight: "bold",
      },
    };
  }
}
