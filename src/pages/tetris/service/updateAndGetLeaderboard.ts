import {
  createDocument,
  readDocument,
  updateDocument,
} from 'services/firebase/firestore';
import type { Stats } from '../logic/stats';
import type { LeaderboardEntry } from '../service/models/leaderboards';
import {
  type GlobalDocument,
  updateLeaderboards as updateLeaderboard,
} from './models/leaderboards';

/**
 * Reads the leaderboard from the database, updates it with the new stats,
 * and saves the document in firestore before returning the updated leaderboard.
 *
 * If the document doesn't exist it will be created.
 */
export async function updateAndGetLeaderboard(
  stats: Stats,
  username?: string,
): Promise<LeaderboardEntry[]> {
  const path = 'leaderboards/tetris';
  let doc = await readDocument<GlobalDocument>(path);
  if (!username) {
    if (!doc) return [];
    return doc.leaderboard;
  }
  const entry: LeaderboardEntry = { user: username, game: stats };
  if (!doc) {
    doc = { leaderboard: [entry] };
    await createDocument(path, doc);
  } else {
    doc = updateLeaderboard(doc, username, stats);
    await updateDocument(path, doc);
  }
  return doc.leaderboard;
}
