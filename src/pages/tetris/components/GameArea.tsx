import { Box, Grid, Typography } from '@mui/material';
import { Display } from 'components/games/Display';
import { useEffect, useState } from 'react';
import { blocks } from '../logic/blocks';
import { previews } from '../logic/preview';
import { useGame } from './GameProvider';
import { StatsGrid } from './Stats/StatsGrid';

export function GameArea() {
  const { game, updateGame } = useGame();

  const [dropTime, setDropTime] = useState(2000);

  const onKeyDown = (event: KeyboardEvent) => {
    event.preventDefault();
    updateGame((old) => {
      if (!old.isStarted) old.start();

      switch (event.key) {
        case 'ArrowRight':
          old.move('right');
          break;
        case 'ArrowLeft':
          old.move('left');
          break;
        case 'ArrowDown':
          old.move('down');
          break;
        case 'ArrowUp':
          console.log('up');
          setDropTime((old) => old - 100);
          break;
        case 'R':
          console.log('Replaying');
          // replay();
          break;
      }
    });
  };
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (game.isOver || !game.isStarted) return;
    console.log('setting interval');
    const interval = setInterval(() => {
      updateGame((old) => old.move('down'));
    }, dropTime);
    return () => clearInterval(interval);
  }, [game.isStarted, game.isOver, dropTime]);

  const Cell = (value: string) => {
    return <Box sx={{ backgroundColor: blocks[value].color }} />;
  };

  const Stage = () => {
    return <Display pixels={game.getStageWithPlayer()} PixelComponent={Cell} />;
  };

  const Next = () => {
    const block = game.next;
    return (
      <Display
        pixels={previews[block]}
        PixelComponent={Cell}
        maxPixelSize={24}
      />
    );
  };

  return (
    <>
      <Grid container columns={{ xs: 5, md: 12 }} spacing={2}>
        <Grid item xs={12}>
          <Next />
        </Grid>
        <Grid item xs={12}>
          <Typography textAlign='center'>{dropTime}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Stage />
        </Grid>
      </Grid>
      <StatsGrid />
    </>
  );
}
