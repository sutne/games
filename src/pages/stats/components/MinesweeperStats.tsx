import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { Card, TopListCard } from 'components/cards';
import { useAuth } from 'components/providers/AuthProvider';
import type { Difficulty } from 'pages/minesweeper/logic/difficulty';
import type { UserDocument } from 'pages/minesweeper/service/models/userDocument';
import { useEffect, useState } from 'react';
import { readDocument } from 'services/firebase/firestore';
import { toPercentageString } from 'utils/numbers';
import { timeString } from 'utils/time';

export function MinesweeperStats() {
  const [hasStats, setHasStats] = useState<boolean>();
  const [doc, setDoc] = useState<UserDocument>();
  const { user } = useAuth();

  useEffect(() => {
    let cancelled = false;
    const getDoc = async () => {
      const data = await readDocument<UserDocument>(`minesweeper/${user.uid}`);
      if (cancelled) return;
      if (!data) {
        // user has not minesweeper stats
        setHasStats(false);
        return;
      }
      setHasStats(true);
      setDoc(data);
    };
    getDoc();
    return () => {
      cancelled = true;
    };
  }, []);

  if (hasStats === false) {
    return (
      <Card>
        <Grid
          container
          columns={{ xs: 4, sm: 8, md: 12 }}
          spacing={2}
          textAlign='center'
        >
          <Grid size={12}>
            <Typography variant='h3'>{'Minesweeper'}</Typography>
          </Grid>
          <Grid size={12}>
            <Typography>
              {"You don't have any stats for this gametype yet :("}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    );
  }

  if (!doc)
    return (
      <Card>
        <Grid
          container
          columns={{ xs: 4, sm: 8, md: 12 }}
          spacing={2}
          textAlign='center'
        >
          <Grid size={12}>
            <Typography variant='h3'>{'Minesweeper'}</Typography>
          </Grid>
          <Grid size={12}>
            <CircularProgress />
          </Grid>
        </Grid>
      </Card>
    );

  const numGamesPlayed =
    doc.beginner.games.played +
    doc.intermediate.games.played +
    doc.expert.games.played;
  const numGamesWon =
    doc.beginner.games.won + doc.intermediate.games.won + doc.expert.games.won;
  const percentageWon = toPercentageString(numGamesWon / numGamesPlayed);
  const percentageCleared = toPercentageString(
    doc.tiles.cleared / (doc.tiles.cleared + doc.tiles.notCleared),
  );
  const flagAccuracy = toPercentageString(
    doc.flags.correct / Math.max(doc.flags.placed, 1),
  );
  const totalTime = timeString(doc.totalTime);

  const Stat = (title: string, value: number | string) => {
    return (
      <Grid size={3}>
        <Stack>
          <Typography>{title}</Typography>
          <Typography variant='h5' fontWeight='bold'>
            {value}
          </Typography>
        </Stack>
      </Grid>
    );
  };

  const DifficultyCard = (difficulty: Difficulty) => {
    const headers = ['Time', 'Cleared', 'Flags'];
    const items = doc[difficulty].best.map((game) => [
      `${timeString(game.time)}`,
      `${toPercentageString(
        game.tiles.cleared / (game.tiles.cleared + game.tiles.notCleared),
      )}`,
      `${game.flags.correct}/${game.flags.placed}`,
    ]);
    const winPercentage = toPercentageString(
      doc[difficulty].games.won / Math.max(doc[difficulty].games.played, 1),
    );

    const DifficultyStats = () => {
      return (
        <Grid container columns={3}>
          <Grid size={1}>
            <Stack>
              <Typography>Played</Typography>
              <Typography>{doc[difficulty].games.played}</Typography>
            </Stack>
          </Grid>
          <Grid size={1}>
            <Stack>
              <Typography>Victories</Typography>
              <Typography>{doc[difficulty].games.won}</Typography>
            </Stack>
          </Grid>
          <Grid size={1}>
            <Stack>
              <Typography>Win Rate</Typography>
              <Typography>{winPercentage}</Typography>
            </Stack>
          </Grid>
        </Grid>
      );
    };

    if (doc[difficulty].games.played === 0) {
      return (
        <Grid size={4}>
          <TopListCard
            type='bordered'
            title={difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          >
            <>
              <Box />
              <DifficultyStats />
            </>
          </TopListCard>
        </Grid>
      );
    }

    return (
      <Grid size={4}>
        <TopListCard
          type='bordered'
          title={difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          headers={headers}
          items={items}
        >
          <>
            <Divider
              orientation='horizontal'
              flexItem
              sx={{ margin: '12px 0' }}
            />
            <DifficultyStats />
          </>
        </TopListCard>
      </Grid>
    );
  };

  return (
    <Card>
      <Grid
        container
        columns={{ xs: 4, sm: 8, md: 12 }}
        spacing={2}
        textAlign='center'
      >
        <Grid size={12}>
          <Typography variant='h3'>{'Minesweeper'}</Typography>
        </Grid>
        <Grid container size={12}>
          <Card type='invisible' padding='12px'>
            <Grid container columns={{ xs: 6, sm: 12 }} spacing={2}>
              {Stat('Games Played', numGamesPlayed)}
              {Stat('Games Won', numGamesWon)}
              {Stat('Win Rate', percentageWon)}
              {Stat('Time Played', totalTime)}
              {Stat('Cells Cleared', doc.tiles.cleared)}
              {Stat('Clear Percentage', percentageCleared)}
              {Stat('Bombs Flagged', doc.flags.correct)}
              {Stat('Flag Accuracy', flagAccuracy)}
            </Grid>
          </Card>
        </Grid>
        {DifficultyCard('beginner')}
        {DifficultyCard('intermediate')}
        {DifficultyCard('expert')}
      </Grid>
    </Card>
  );
}
