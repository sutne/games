import { Grid } from '@mui/material';
import type React from 'react';
import type { SetStateAction } from 'react';
import type { Difficulty } from '../../logic/difficulty';
import { GameStats } from './GameStats';
import { Leaderboard } from './Leaderboard';
import { PersonalBest } from './PersonalBest';

type props = {
  setDifficulty: React.Dispatch<SetStateAction<Difficulty | undefined>>;
};
export function StatsGrid({ setDifficulty }: props) {
  const classes = getClasses();
  return (
    <Grid
      container
      columns={{ xs: 6, sm: 12 }}
      spacing={2}
      sx={classes.container}
    >
      <Grid item xs={12}>
        <GameStats {...{ setDifficulty }} />
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
        paddingTop: '16px',
        textAlign: 'center',
      },
    };
  }
}
