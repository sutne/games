import { Box, Button, Typography } from "@mui/material";

import "./Minesweeper.css";
import { Difficulty } from "./logic";
import { Board } from "./components/Board";
import React, { useState } from "react";
import { GameProvider, useGame } from "./hooks/GameProvider";
import { Game } from "./logic";
import { Replay } from "@mui/icons-material";
import { useEffect } from "react";

export function Minesweeper() {
  const [difficulty, setDifficulty] = useState<Difficulty>();
  const props = { difficulty: difficulty, setDifficulty: setDifficulty };
  return (
    <Box className="minesweeper-container">
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
      <Board />
      {game.isWon || game.isLost ? (
        <>
          <Typography variant="body1">
            {game.isWon ? "You Won!" : "You Lost :("}
          </Typography>
          <Typography variant="body1">Score: {game.getScore(1)}</Typography>
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
