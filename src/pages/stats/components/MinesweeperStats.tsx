import React, { useEffect, useState } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";

import { Card, TopListCard } from "components/cards";
import { useAuth } from "components/providers/AuthProvider";
import { Difficulty } from "pages/minesweeper/logic/difficulty";
import { UserDocument } from "pages/minesweeper/service/models/userDocument";
import { readDocument } from "services/firebase/firestore";
import { toPercentageString } from "utils/numbers";
import { timeString } from "utils/time";

export function MinesweeperStats() {
  const [doc, setDoc] = useState<UserDocument>();
  const { user } = useAuth();

  useEffect(() => {
    let cancelled = false;
    const getDoc = async () => {
      const data = await readDocument<UserDocument>(`minesweeper/${user.uid}`);
      if (!data || cancelled) return;
      setDoc(data);
    };
    getDoc();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!doc) return <Box>Loading ...</Box>;

  const numGamesPlayed =
    doc.beginner.games.played +
    doc.intermediate.games.played +
    doc.expert.games.played;
  const numGamesWon =
    doc.beginner.games.won + doc.intermediate.games.won + doc.expert.games.won;
  const percentageWon = toPercentageString(numGamesWon / numGamesPlayed);
  const percentageCleared = toPercentageString(
    doc.tiles.cleared / (doc.tiles.cleared + doc.tiles.notCleared)
  );
  const flagAccuracy = toPercentageString(doc.flags.correct / doc.flags.placed);
  const totalTime = timeString(doc.totalTime);

  const Stat = (title: string, value: number | string) => {
    return (
      <Grid item xs={3}>
        <Stack>
          <Typography>{title}</Typography>
          <Typography variant="h5" fontWeight="bold">
            {value}
          </Typography>
        </Stack>
      </Grid>
    );
  };

  const PersonalBest = (difficulty: Difficulty) => {
    const headers = ["Time", "Cleared", "Flags"];
    const items = doc[difficulty].best.map((game) => [
      `${timeString(game.time)}`,
      `${toPercentageString(
        game.tiles.cleared / (game.tiles.cleared + game.tiles.notCleared)
      )}`,
      `${game.flags.correct}/${game.flags.placed}`,
    ]);
    return (
      <Grid item xs={4}>
        <TopListCard
          type="bordered"
          title={difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          headers={headers}
          items={items}
        />
      </Grid>
    );
  };

  return (
    <Card>
      <Grid
        container
        columns={{ xs: 4, sm: 8, md: 12 }}
        spacing={2}
        textAlign="center"
      >
        <Grid item xs={12}>
          <Typography variant="h3">{"Minesweeper"}</Typography>
        </Grid>
        <Grid container item xs={12}>
          <Card type="bordered">
            <Grid container columns={{ xs: 6, sm: 12 }} spacing={2}>
              {Stat("Games Played", numGamesPlayed)}
              {Stat("Games Won", numGamesWon)}
              {Stat("Win Rate", percentageWon)}
              {Stat("Time Played", totalTime)}
              {Stat("Cells Cleared", doc.tiles.cleared)}
              {Stat("Clear Percentage", percentageCleared)}
              {Stat("Bombs Flagged", doc.flags.correct)}
              {Stat("Flag Accuracy", flagAccuracy)}
            </Grid>
          </Card>
        </Grid>
        {PersonalBest("beginner")}
        {PersonalBest("intermediate")}
        {PersonalBest("expert")}
      </Grid>
    </Card>
  );
}
