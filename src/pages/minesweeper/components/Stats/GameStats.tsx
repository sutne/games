import * as Icons from '@mui/icons-material';
import { FadeIn } from 'components/animations/FadeIn';
import { StatCard } from 'components/cards/StatCard';
import { AutoScroll } from 'components/functional';
import type React from 'react';
import { type SetStateAction, useEffect, useState } from 'react';
import { toPercentageString } from 'utils/numbers';
import { timeString } from 'utils/time';
import type { Difficulty } from '../../logic/difficulty';
import { getStats } from '../../logic/stats';
import { useGame } from '../GameProvider';

type props = {
  setDifficulty: React.Dispatch<SetStateAction<Difficulty | undefined>>;
};
export function GameStats({ setDifficulty }: props) {
  const { game, replay } = useGame();
  const stats = getStats(game);

  const [time, setTime] = useState('');
  const [flags, setFlags] = useState('');
  const [cleared, setCleared] = useState('');

  useEffect(() => {
    if (!game.isOver()) return;
    setTime(timeString(stats.time));
    setFlags(`${stats.flags.correct}/${stats.flags.placed}`);
    setCleared(
      toPercentageString(
        stats.tiles.cleared / (stats.tiles.notCleared + stats.tiles.cleared),
      ),
    );
  }, [game.isLost, game.isWon]);

  return (
    <FadeIn trigger={game.isOver()}>
      <AutoScroll>
        <StatCard
          header={game.isWon ? 'You won' : 'You lost'}
          items={[
            { title: 'Time', value: time },
            { title: 'Cleared', value: cleared },
            { title: 'Correct Flags', value: flags },
          ]}
          actions={[
            {
              icon: <Icons.Replay />,
              description: 'Replay',
              action: () => replay(),
            },
            {
              icon: <Icons.SwapHoriz />,
              description: 'Change Difficulty',
              action: () => setDifficulty(undefined),
            },
          ]}
        />
      </AutoScroll>
    </FadeIn>
  );
}
