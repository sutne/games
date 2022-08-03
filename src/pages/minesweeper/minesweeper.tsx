import { Box, Button, Typography } from "@mui/material";

import "./Minesweeper.css";
import { Difficulty } from "./logic";
import { Board } from "./components/Board";
import React, { useEffect, useRef, useState } from "react";
import { GameProvider, useGame } from "./hooks/GameProvider";
import { Game } from "./logic";
import { Replay } from "@mui/icons-material";
import { formatTime } from "utils/time";

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

// function Timer() {
//   const game = useGame()[0];
//   const [startTime, setStartTime] = useState(0);
//   const [time, setTime] = useState(0);
//   const [isRunning, setRunning] = useState(false);

//   useEffect(() => {
//     let timer: any;
//     let gameInProgress =
//       game.hasInitializedBombs && !game.isLost && !game.isWon;
//     if (!isRunning && gameInProgress) {
//       setStartTime(new Date().getTime());
//       timer = setInterval(() => {
//         setTime(new Date().getTime() - startTime);
//       }, 1000);
//       setRunning(true);
//     }
//     if (isRunning && !gameInProgress) {
//       clearInterval(timer);
//     }
//   }, [game, isRunning, startTime]);

//   useEffect(() => {
//     let timer: any;
//     let gameInProgress =
//       game.hasInitializedBombs && !(game.isLost || game.isWon);
//     if (!isRunning && gameInProgress) {
//       // Start Timer
//       timer = setInterval(() => {
//         setTime((prevTime) => prevTime + 1);
//       }, 100);
//       setRunning(true);
//     }
//     if (isRunning && !gameInProgress) {
//       // Stop Timer
//       clearInterval(timer);
//       setRunning(false);
//     }
//     // if (isRunning && !game.hasInitializedBombs) {
//     //   // Reset Timer
//     //   setTime(0);
//     // }
//   }, [game, isRunning]);

//   let [minutes, seconds, milliseconds] = formatTime(time);
//   return (
//     <div className="timer">
//       <span>{minutes}:</span>
//       <span>{seconds}.</span>
//       <span>{milliseconds}</span>
//     </div>
//   );
// }
