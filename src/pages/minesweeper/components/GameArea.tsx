import React from "react";
import { Replay } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";

import { useGame } from "../hooks/GameProvider";
import { Game } from "../logic";
import { Board } from "./Board";
import { DifficultyProps } from "./DifficultySelector";

export function GameArea({ setDifficulty }: DifficultyProps) {
  const [game, setGame] = useGame();

  return (
    <>
      {/* <Timer /> */}
      <Board />
      {game.isWon || game.isLost ? (
        <>
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
      ) : (
        <Typography
          variant="h5"
          style={{ paddingTop: "30px" }}
        >{`${game.numRemainingFlags} 🚩 Remaining`}</Typography>
      )}
    </>
  );
}
