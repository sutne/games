import React, { SetStateAction, useEffect, useState } from "react";
import * as Icons from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";

import { Card, TopListCard } from "components/cards";
import { StatCard } from "components/cards/StatCard";
import { AutoScroll } from "components/functional";
import { useAuth } from "components/providers";
import { SignInPrompt } from "components/typography";
import { toPercentageString } from "utils/numbers";
import { timeString } from "utils/time";

import { Difficulty } from "../logic/difficulty";
import { equals, getStats, Stats } from "../logic/stats";
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
    if (!game.isOver()) return;
    if (stats !== undefined) return;
    setStats(getStats(game));
  }, [game.isWon, game.isLost]);

  useEffect(() => {
    // Load leaderboard and user stats when the stats are set
    if (stats === undefined) return;
    if (game.isSaved) return;
    updateGame((prev) => (prev.isSaved = true));
    let cancelled = false;

    const fetchPersonal = async () => {
      // Only load if user is signed in
      if (!user.uid || !user.username) return;
      const userDoc = await updateAndGetUserDocument(
        user.uid,
        game.difficulty,
        stats
      );
      if (cancelled) return;
      setPersonalBest(userDoc[game.difficulty].best);
    };

    const fetchLeaderboard = async () => {
      // Load leaderboard
      const leaderboard = await updateAndGetLeaderboard(
        game.difficulty,
        stats,
        user.username ?? undefined
      );
      if (cancelled) return;
      setLeaderboard(leaderboard ?? []);
    };

    fetchPersonal();
    fetchLeaderboard();
    return () => {
      cancelled = true;
    };
  }, [stats]);

  const Stats = () => {
    if (!game.isOver() || !stats) return <></>;
    const cleared = toPercentageString(
      stats.tiles.cleared / (stats.tiles.notCleared + stats.tiles.cleared)
    );
    const isOnPersonalBestBoard =
      personalBest.findIndex((item) => equals(item, stats)) !== -1;

    const valueBox = (value: any) => (
      <Box sx={{ color: isOnPersonalBestBoard ? "info.main" : "text.primary" }}>
        {value}
      </Box>
    );
    return (
      <StatCard
        header={game.isWon ? "You won" : "You lost"}
        items={[
          {
            title: "Time",
            value: valueBox(timeString(stats.time)),
          },
          { title: "Cleared", value: valueBox(cleared) },
          {
            title: "Correct Flags",
            value: valueBox(`${stats.flags.correct}/${stats.flags.placed}`),
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
    if (!stats) return <></>;
    if (!user.isSignedIn) {
      return (
        <Card>
          <Typography variant="h4">Personal Best</Typography>
          <SignInPrompt
            pre="To save/view your games you have to"
            post="This also gives you the opportunity to end up on the leaderboard."
          />
        </Card>
      );
    }
    const headers = ["Time", "Cleared", "Flags"];
    const items = personalBest.map((game) => [
      `${timeString(game.time)}`,
      `${toPercentageString(
        game.tiles.cleared / (game.tiles.cleared + game.tiles.notCleared)
      )}`,
      `${game.flags.correct}/${game.flags.placed}`,
    ]);
    const currentIndex = personalBest.findIndex((item) => equals(item, stats));
    return (
      <TopListCard
        title="Personal Best"
        headers={headers}
        items={items}
        highlightIndex={currentIndex}
      />
    );
  };

  const Leaderboard = () => {
    if (!game.isOver()) return <></>;
    if (!stats) return <></>;
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
    const currentIndex = leaderboard.findIndex((item) =>
      equals(item.game, stats)
    );
    const userIndex = leaderboard.findIndex(
      (item) => item.user === user.username
    );
    return (
      <AutoScroll>
        <TopListCard
          title="Leaderboard"
          headers={headers}
          items={items}
          highlightIndex={userIndex}
          // diffrent color on leaderboard if user item is new or old
          highlightColor={currentIndex === -1 ? "game.colors.green" : undefined}
        />
      </AutoScroll>
    );
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
      <Grid item xs={6} sm={5}>
        <PersonalBest />
      </Grid>
      <Grid item xs={6} sm={7}>
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
