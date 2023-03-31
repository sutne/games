import React from "react";
import { Grid } from "@mui/material";

import { GameStats } from "./GameStats";
import { Leaderboard } from "./Leaderboard";
import { PersonalBest } from "./PersonalBest";


export function StatsGrid() {
  const classes = getClasses();
  return (
    <Grid
      container
      columns={{ xs: 6, sm: 12 }}
      spacing={2}
      sx={classes.container}
    >
      <Grid item xs={12}>
        <GameStats />
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
        paddingTop: "16px",
        textAlign: "center",
      },
    };
  }
}
