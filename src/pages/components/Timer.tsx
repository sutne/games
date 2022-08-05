import React, { useState } from "react";

import { convertTime } from "utils/time";

function Timer() {
  // const game = useGame()[0];
  const [startTime, setStartTime] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setRunning] = useState(false);

  // useEffect(() => {
  //   let timer: any;
  //   let gameInProgress =
  //     game.hasInitializedBombs && !game.isLost && !game.isWon;
  //   if (!isRunning && gameInProgress) {
  //     setStartTime(new Date().getTime());
  //     timer = setInterval(() => {
  //       setTime(new Date().getTime() - startTime);
  //     }, 1000);
  //     setRunning(true);
  //   }
  //   if (isRunning && !gameInProgress) {
  //     clearInterval(timer);
  //   }
  // }, [game, isRunning, startTime]);

  // useEffect(() => {
  //   let timer: any;
  //   let gameInProgress =
  //     game.hasInitializedBombs && !(game.isLost || game.isWon);
  //   if (!isRunning && gameInProgress) {
  //     // Start Timer
  //     timer = setInterval(() => {
  //       setTime((prevTime) => prevTime + 1);
  //     }, 100);
  //     setRunning(true);
  //   }
  //   if (isRunning && !gameInProgress) {
  //     // Stop Timer
  //     clearInterval(timer);
  //     setRunning(false);
  //   }
  //   // if (isRunning && !game.hasInitializedBombs) {
  //   //   // Reset Timer
  //   //   setTime(0);
  //   // }
  // }, [game, isRunning]);

  const [minutes, seconds, milliseconds] = convertTime(time);
  return (
    <div className="timer">
      <span>{minutes}:</span>
      <span>{seconds}.</span>
      <span>{milliseconds}</span>
    </div>
  );
}
