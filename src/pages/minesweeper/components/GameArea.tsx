import React, { SetStateAction } from "react";
import * as Icons from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

import { StatCard } from "components/cards/StatCard";
import { toPercentageString } from "utils/numbers";
import { timeString } from "utils/time";

import { Difficulty, getStats } from "../logic";
import { Board, useGame } from ".";

type props = {
  setDifficulty: React.Dispatch<SetStateAction<Difficulty | undefined>>;
};
export function GameArea({ setDifficulty }: props) {
  const { game } = useGame();

  const showStats = () => {
    if (!game.isOver()) return;
    const stats = getStats(game);
    console.log("game stats", stats);
    const cleared = toPercentageString(
      stats.tiles.cleared / (stats.tiles.notCleared + stats.tiles.cleared)
    );

    return (
      <Box sx={classes.statContainer}>
        <StatCard
          header={game.isWon ? "You won" : "You lost"}
          items={[
            { title: "Time", value: timeString(stats.time) },
            { title: "Cleared", value: cleared },
            {
              title: "Correct Flags",
              value: `${stats.flags.correct}/${stats.flags.placed}`,
            },
          ]}
          actions={[
            {
              icon: Icons.Replay,
              description: "Replay",
              action: () => {
                setDifficulty(undefined);
                setDifficulty(game.difficulty);
              },
            },
            {
              icon: Icons.SwapHoriz,
              description: "Change Difficulty",
              action: () => {
                setDifficulty(undefined);
              },
            },
          ]}
        />
      </Box>
    );
  };

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

  function getClasses() {
    return {
      header: {
        textAlign: "center",
        padding: "12px",
        fontWeight: "bold",
        visibility: game?.isOver() ? "hidden" : "",
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
