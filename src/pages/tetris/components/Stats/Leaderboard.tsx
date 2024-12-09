import { FadeIn } from 'components/animations/FadeIn';
import { TopListCard } from 'components/cards';
import { AutoScroll } from 'components/functional';
import { useAuth } from 'components/providers';
import { useEffect, useState } from 'react';
import { timeString } from 'utils/time';
import { equals, getStats } from '../../logic/stats';
import type { LeaderboardEntry } from '../../service/models/leaderboards';
import { updateAndGetLeaderboard } from '../../service/updateAndGetLeaderboard';
import { useGame } from '../GameProvider';

export function Leaderboard() {
  const { game, updateGame } = useGame();
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>();
  const stats = getStats(game);

  useEffect(() => {
    // Load leaderboard and user stats when the stats are set
    if (!game.isOver || game.isSavedToLeaderboard) return;
    updateGame((prev) => {
      prev.isSavedToLeaderboard = true;
    });
    let cancelled = false;

    const fetch = async () => {
      // Load leaderboard
      const leaderboard = await updateAndGetLeaderboard(stats, user.username);
      if (cancelled) return;
      setLeaderboard(leaderboard);
    };

    fetch();
    return () => {
      cancelled = true;
    };
  }, [game.isOver]);

  const headers = ['Time', 'Cleared', 'Flags', 'User'];
  const items = leaderboard?.map((entry) => [
    `${timeString(entry.game.time)}`,
    `${entry.game.linesCleared}`,
    `${entry.game.blocksPlaced}`,
    `${entry.user}`,
  ]);
  const isOld = !leaderboard?.some((item) => equals(item.game, stats));
  const userIndex = leaderboard?.findIndex(
    (item) => item.user === user.username,
  );

  return (
    <FadeIn trigger={leaderboard !== undefined && game.isOver}>
      <AutoScroll>
        <TopListCard
          title='Leaderboard'
          headers={headers}
          items={items}
          highlightIndex={userIndex}
          // diffrent color on leaderboard if user item is new or old
          highlightColor={isOld ? 'game.colors.green' : undefined}
        />
      </AutoScroll>
    </FadeIn>
  );
}
