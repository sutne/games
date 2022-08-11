import React, { SetStateAction, useEffect, useState } from "react";
import * as Icons from "@mui/icons-material";
import { Grid } from "@mui/material";

import { TopListCard } from "components/cards";
import { StatCard } from "components/cards/StatCard";
import { useAuth } from "components/providers";
import { toPercentageString } from "utils/numbers";
import { timeString } from "utils/time";

import { Difficulty } from "../logic/difficulty";
import { getStats, Stats } from "../logic/stats";
import { LeaderboardEntry } from "../service/models/leaderboards";
import { updateAndGetLeaderboard } from "../service/updateAndGetLeaderboard";
import { updateAndGetUserDocument } from "../service/updateAndGetUserDocument";
import { useGame } from "./GameProvider";

type props = {
  setDifficulty: React.Dispatch<SetStateAction<Difficulty | undefined>>;
};
export function GameStats({ setDifficulty }: props) {
  const { game, updateGame, replay } = useGame();
  const { user } = useAuth();

  const [stats, setStats] = useState<Stats>();
  const [personalBest, setPersonalBest] = useState<Stats[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    // When the game is over get its stats
    if (!user.isSignedIn) return;
    if (!game.isOver()) return;
    if (stats !== undefined) return;
    setStats(getStats(game));
  }, [game.isOver()]);

  useEffect(() => {
    // Load leaderboard and user stats when the stats are set
    if (stats === undefined) return;
    if (game.isSaved) return;
    updateGame((prev) => (prev.isSaved = true));
    let cancelled = false;
    const fetch = async () => {
      if (!user.uid || !user.username) return;
      const userDoc = await updateAndGetUserDocument(user.uid, stats);
      if (cancelled) return;
      setPersonalBest(userDoc[game.difficulty].best);
      const leaderboard = await updateAndGetLeaderboard(
        game.difficulty,
        user.username,
        stats
      );
      if (cancelled) return;
      setLeaderboard(leaderboard);
    };
    fetch();
    return () => {
      cancelled = true;
    };
  }, [stats]);

  const Stats = () => {
    if (!game.isOver() || !stats) return <></>;
    const cleared = toPercentageString(
      stats.tiles.cleared / (stats.tiles.notCleared + stats.tiles.cleared)
    );

    return (
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
            icon: <Icons.Replay />,
            description: "Replay",
            action: () => {
              setStats(undefined);
              setLeaderboard([]);
              setPersonalBest([]);
              replay();
            },
          },
          {
            icon: <Icons.SwapHoriz />,
            description: "Change Difficulty",
            action: () => {
              setDifficulty(undefined);
            },
          },
        ]}
      />
    );
  };

  const PersonalBest = () => {
    if (!game.isOver()) return <></>;
    const headers = ["Time", "Cleared", "Flags"];
    const items = personalBest.map((game) => [
      `${timeString(game.time)}`,
      `${toPercentageString(
        game.tiles.cleared / (game.tiles.cleared + game.tiles.notCleared)
      )}`,
      `${game.flags.correct}/${game.flags.placed}`,
    ]);
    return (
      <TopListCard title="Personal Best" headers={headers} items={items} />
    );
  };

  const Leaderboard = () => {
    if (!game.isOver()) return <></>;
    const headers = ["Time", "Cleared", "Flags", "User"];
    const items = leaderboard.map((entry) => [
      `${timeString(entry.game.time)}`,
      `${toPercentageString(
        entry.game.tiles.cleared /
          (entry.game.tiles.cleared + entry.game.tiles.notCleared)
      )}`,
      `${entry.game.flags.correct}/${entry.game.flags.placed}`,
      `${entry.user}`,
    ]);
    return <TopListCard title="Leaderboard" headers={headers} items={items} />;
  };

  const classes = getClasses();
  return (
    <Grid
      container
      columns={{ xs: 6, sm: 12 }}
      spacing={2}
      sx={classes.container}
    >
      <Grid item xs={12}>
        <Stats />
      </Grid>
      <Grid item xs={6}>
        <PersonalBest />
      </Grid>
      <Grid item xs={6}>
        <Leaderboard />
      </Grid>
    </Grid>
  );

  function getClasses() {
    return {
      container: {
        marginTop: "32px",
        textAlign: "center",
      },
    };
  }
}
