import { Box, Button, Typography } from "@mui/material";

import { Difficulty } from "./logic";
import { Board } from "./components/Board";
import React, { useState } from "react";
import { GameProvider, useGame } from "./hooks/GameProvider";
import { Game } from "./logic";
import { Replay } from "@mui/icons-material";

export function Minesweeper() {
  const [difficulty, setDifficulty] = useState<Difficulty>();
  const props = { difficulty: difficulty, setDifficulty: setDifficulty };
  const classes = getStyle();
  return (
    <Box sx={classes.minesweeperContainer}>
      <Typography variant="h3">Minesweeper</Typography>
      {difficulty === undefined ? (
        <SelectDifficulty {...props} />
      ) : (
        <GameProvider difficulty={difficulty}>
          <GameArea {...props} />
        </GameProvider>
      )}
    </Box>
  );
}

type DifficultyProps = {
  difficulty: Difficulty | undefined;
  setDifficulty: React.Dispatch<React.SetStateAction<Difficulty | undefined>>;
};

export function SelectDifficulty({ setDifficulty }: DifficultyProps) {
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

function GameArea({ difficulty, setDifficulty }: DifficultyProps) {
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
          <Button onClick={() => setGame(new Game(difficulty!))}>
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

//------------------------------------------------------------------------------

function getStyle() {
  return {
    minesweeperContainer: {
      height: "100vh",
      /* Center board vertically in parent */
      display: "flex",
      textAlign: "center",
      flexDirection: "column",
      justifyContent: "center",
      alignContent: "center",
    },
  };
}
