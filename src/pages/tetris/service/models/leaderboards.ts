import { type Entry, updateLeaderboardList } from 'utils/lists';
import { type Stats, firstIsBest as firstStatIsBest } from '../../logic/stats';

export interface LeaderboardEntry extends Entry {
  user: string;
  game: Stats;
}

export type GlobalDocument = {
  leaderboard: LeaderboardEntry[];
};

function firstIsBest(A: LeaderboardEntry, B: LeaderboardEntry): boolean {
  return firstStatIsBest(A.game, B.game);
}

/**
 * @param doc the old leaderboards document
 * @param username name of user who played the game
 * @param stats the stats to update the document with
 * @returns the updated document
 */
export function updateLeaderboards(
  doc: GlobalDocument,
  username: string,
  stats: Stats,
): GlobalDocument {
  const newEntry: LeaderboardEntry = { user: username, game: stats };
  doc.leaderboard = updateLeaderboardList(
    doc.leaderboard,
    newEntry,
    username,
    firstIsBest,
  );
  return doc;
}
