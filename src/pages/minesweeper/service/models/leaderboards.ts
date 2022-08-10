import { getPersonalBest } from "utils/lists";

import { Difficulty } from "../../logic/difficulty";
import { comparator as statComparator, Stats } from "../../logic/stats";

export type LeaderboardEntry = {
  user: string;
  game: Stats;
};

export type Leaderboards = {
  beginner: LeaderboardEntry[];
  intermediate: LeaderboardEntry[];
  expert: LeaderboardEntry[];
};

function comparator(A: LeaderboardEntry, B: LeaderboardEntry): 1 | -1 {
  return statComparator(A.game, B.game);
}

export function updateLeaderboards(
  doc: Leaderboards,
  difficulty: Difficulty,
  username: string,
  stats: Stats
): Leaderboards {
  const entry: LeaderboardEntry = { user: username, game: stats };
  doc[difficulty] = getPersonalBest(doc[difficulty], entry, comparator);
  return doc;
}
