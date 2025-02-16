import { Typography } from '@mui/material';
import { FadeIn } from 'components/animations/FadeIn';
import { Card, TopListCard } from 'components/cards';
import { AutoScroll } from 'components/functional';
import { useAuth } from 'components/providers';
import { SignInPrompt } from 'components/typography';
import { useEffect, useState } from 'react';
import { timeString } from 'utils/time';
import { type Stats, equals, getStats } from '../../logic/stats';
import { updateAndGetUserDocument } from '../../service/updateAndGetUserDocument';
import { useGame } from '../GameProvider';

export function PersonalBest() {
  const { game, updateGame } = useGame();
  const { user } = useAuth();
  const [personalBest, setPersonalBest] = useState<Stats[]>();
  const stats = getStats(game);

  useEffect(() => {
    // Load leaderboard and user stats when the stats are set
    if (!game.isOver || game.isSavedToUserDocument) return;
    updateGame((prev) => {
      prev.isSavedToUserDocument = true;
    });
    let cancelled = false;

    const fetch = async () => {
      // Only load if user is signed in
      if (!user.uid || !user.username) return;
      const userDoc = await updateAndGetUserDocument(user.uid, stats);
      if (cancelled) return;
      setPersonalBest(userDoc.best);
    };

    fetch();
    return () => {
      cancelled = true;
    };
  }, [game.isOver]);

  const headers = ['Time', 'Cleared', 'Flags'];
  const items = personalBest?.map((game) => [
    `${timeString(game.time)}`,
    `${game.linesCleared}`,
    `${game.blocksPlaced}`,
  ]);
  const currentIndex = personalBest?.findIndex((item) => equals(item, stats));

  return (
    <FadeIn
      trigger={
        game.isOver &&
        ((user.isSignedIn && personalBest !== undefined) || !user.isSignedIn)
      }
    >
      <AutoScroll>
        {!user.isSignedIn ? (
          <Card>
            <Typography variant='h4'>Personal Best</Typography>
            <SignInPrompt
              pre='To save your games you have to'
              post='This also gives you the opportunity to end up on the leaderboard.'
            />
          </Card>
        ) : (
          <TopListCard
            title='Personal Best'
            headers={headers}
            items={items}
            highlightIndex={currentIndex}
          />
        )}
      </AutoScroll>
    </FadeIn>
  );
}
