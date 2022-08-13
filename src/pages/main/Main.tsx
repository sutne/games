import React from "react";
import { Grid, Typography } from "@mui/material";

import { Card } from "components/cards/Card";
import { PageHeader } from "components/typography";
import { games } from "games";

import { GameCard } from "./components/GameCard";

export function Main() {
  const disabledGames = games.filter((game) => !game.isAvailable);
  const enabledGames = games.filter((game) => game.isAvailable);

  return (
    <>
      <PageHeader header="sutne's Minimalistic Games" />
      <Grid
        container
        spacing={3}
        alignItems="stretch"
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {enabledGames.map((game) => (
          <Grid item xs={4} key={game.name}>
            <GameCard {...game} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Typography variant="h4" textAlign="center">
            Coming soon(ish)
          </Typography>
        </Grid>
        {disabledGames.map((game) => (
          <Grid item xs={4} key={game.name}>
            <GameCard {...game} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
