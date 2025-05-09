import { Typography } from '@mui/material';
import type React from 'react';
import type { SetStateAction } from 'react';
import type { Difficulty } from '../logic/difficulty';
import { Board } from './Board';
import { useGame } from './GameProvider';
import { StatsGrid } from './Stats/StatsGrid';

type props = {
  setDifficulty: React.Dispatch<SetStateAction<Difficulty | undefined>>;
};
export function GameArea({ setDifficulty }: props) {
  const { game } = useGame();

  const classes = getClasses();
  return (
    <>
      <Typography variant='h5' sx={classes.header}>
        {`${game.numRemainingFlags} 🚩 Remaining`}
      </Typography>
      <Board />
      <StatsGrid setDifficulty={setDifficulty} />
    </>
  );

  function getClasses() {
    return {
      header: {
        textAlign: 'center',
        padding: '12px',
        fontWeight: 'bold',
        visibility: game?.isOver() ? 'hidden' : 'visible',
      },
    };
  }
}
