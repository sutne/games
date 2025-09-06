import { type Entry, updateLeaderboardList } from 'utils/lists';
import type { Difficulty } from '../../logic/difficulty';
import { firstIsBest as firstStatIsBest, type Stats } from '../../logic/stats';

export interface LeaderboardEntry extends Entry {
  user: string;
  game: Stats;
}

export type Leaderboards = {
  beginner: LeaderboardEntry[];
  intermediate: LeaderboardEntry[];
  expert: LeaderboardEntry[];
};

function firstIsBest(A: LeaderboardEntry, B: LeaderboardEntry): boolean {
  return firstStatIsBest(A.game, B.game);
}

/**
 * @param doc the old leaderboards document
 * @param difficulty the difficulty of the game
 * @param username name of user who played the game
 * @param stats the stats to update the document with
 * @returns `[new document, insertion index]` where the insertion index is the
 * index at which the game is on the personal best list (or -1 if it wasn't good
 * enough);
 */
export function updateLeaderboards(
  doc: Leaderboards,
  difficulty: Difficulty,
  username: string,
  stats: Stats,
): Leaderboards {
  const newEntry: LeaderboardEntry = { user: username, game: stats };
  doc[difficulty] = updateLeaderboardList(
    doc[difficulty],
    newEntry,
    username,
    firstIsBest,
  );
  return doc;
}
