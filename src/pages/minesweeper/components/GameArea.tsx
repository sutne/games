import React from "react";
import * as Icons from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

import { GameStatCard } from "pages/components/GameStatCard";
import { toPercentageString } from "utils/numbers";
import { convertTime } from "utils/time";

import { useGame } from "../hooks/GameProvider";
import { Game } from "../logic";
import { Board } from "./Board";
import { DifficultyProps } from "./DifficultySelector";

export function GameArea({ setDifficulty }: DifficultyProps) {
  const [game, setGame] = useGame();

  const classes = getClasses();
  return (
    <>
      <Typography variant="h5" sx={classes.header}>
        {`${game.numRemainingFlags} 🚩 Remaining`}
      </Typography>
      <Board />
      {showStats()}
    </>
  );

  function showStats() {
    if (!game.isOver()) return;
    const cleared = toPercentageString(game.stats.clearPercentage);
    const [m, s, h] = convertTime(game.stats.time);
    const time = `${m}:${s}.${h}`;
    return (
      <Box sx={classes.statContainer}>
        <GameStatCard
          header={game.isWon ? "You won" : "You lost"}
          items={[
            { title: "Time", value: time },
            { title: "Cleared", value: cleared },
            { title: "Correct Flags", value: game.stats.numCorrectFlags },
          ]}
          actions={[
            {
              icon: Icons.Replay,
              description: "Replay",
              action: () => setGame(new Game(game.difficulty)),
            },
            {
              icon: Icons.SwapHoriz,
              description: "Change Difficulty",
              action: () => setDifficulty(undefined),
            },
          ]}
        />
      </Box>
    );
  }

  function getClasses() {
    return {
      header: {
        textAlign: "center",
        padding: "12px",
        fontWeight: "bold",
        visibility: game.isOver() ? "hidden" : "",
      },
      statContainer: {
        marginTop: "3rem",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        textAlign: "center",
      },
    };
  }
}
