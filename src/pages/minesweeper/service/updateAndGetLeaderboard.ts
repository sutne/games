import {
  createDocument,
  readDocument,
  updateDocument,
} from 'services/firebase/firestore';
import type { Difficulty } from '../logic/difficulty';
import type { Stats } from '../logic/stats';
import type { LeaderboardEntry } from '../service/models/leaderboards';
import { type Leaderboards, updateLeaderboards } from './models/leaderboards';

/**
 * Reads the leaderboard from the database, updates it with the new stats,
 * and saves the document in firestore before returning the updated leaderboard.
 *
 * If the document doesn't exist it will be created.
 */
export async function updateAndGetLeaderboard(
  difficulty: Difficulty,
  stats: Stats,
  username?: string,
): Promise<LeaderboardEntry[]> {
  const path = 'leaderboards/minesweeper';
  let leaderboards = await readDocument<Leaderboards>(path);
  if (!username) {
    if (!leaderboards) return [];
    return leaderboards[difficulty];
  }
  const entry: LeaderboardEntry = { user: username, game: stats };
  if (!leaderboards) {
    leaderboards = {
      beginner: [],
      intermediate: [],
      expert: [],
    };
    leaderboards[difficulty].push(entry);
    await createDocument(path, leaderboards);
  } else {
    leaderboards = updateLeaderboards(
      leaderboards,
      difficulty,
      username,
      stats,
    );
    await updateDocument(path, leaderboards);
  }
  return leaderboards[difficulty];
}
