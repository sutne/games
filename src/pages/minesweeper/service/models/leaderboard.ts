import { getTopList } from "utils/lists";

import { comparator as statComparator, Stats } from "../../logic/stats";

type entry = {
  user: string;
  game: Stats;
};
// Global "Leaderboard", one doc for each difficulty
export type Leaderboard = {
  leaderboard: entry[];
};

function comparator(A: entry, B: entry): 1 | -1 {
  return statComparator(A.game, B.game);
}

export function updateLeaderboard(
  doc: Leaderboard,
  username: string,
  stats: Stats
): Leaderboard {
  const entry: entry = { user: username, game: stats };
  doc.leaderboard = getTopList(doc.leaderboard, entry, comparator);
  return doc;
}
