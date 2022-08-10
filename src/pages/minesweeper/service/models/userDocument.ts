import { getTopList } from "utils/lists";

import { comparator, Stats } from "../../logic/stats";

type DifficultyStats = {
  games: {
    played: number;
    won: number;
  };
  best: Stats[];
};
export type UserDocument = {
  beginner: DifficultyStats;
  intermediate: DifficultyStats;
  expert: DifficultyStats;
  totalTime: number;
  tiles: {
    cleared: number;
    notCleared: number;
  };
  flags: {
    placed: number;
    correct: number;
  };
};

export function updateUserDocument(
  doc: UserDocument,
  stats: Stats
): UserDocument {
  doc.totalTime += stats.time;
  doc.flags.correct += stats.flags.correct;
  doc.flags.placed += stats.flags.placed;
  doc.tiles.cleared += stats.tiles.cleared;
  doc.tiles.notCleared += stats.tiles.notCleared;
  doc[stats.difficulty].games.played += 1;
  doc[stats.difficulty].games.won += stats.victory ? 1 : 0;
  doc[stats.difficulty].best = getTopList(
    doc[stats.difficulty].best,
    stats,
    comparator
  );
  return doc;
}

export function emptyUserDocument(): UserDocument {
  const doc: UserDocument = {
    beginner: {
      games: {
        played: 0,
        won: 0,
      },
      best: [],
    },
    intermediate: {
      games: {
        played: 0,
        won: 0,
      },
      best: [],
    },
    expert: {
      games: {
        played: 0,
        won: 0,
      },
      best: [],
    },
    tiles: {
      cleared: 0,
      notCleared: 0,
    },
    flags: {
      placed: 0,
      correct: 0,
    },
    totalTime: 0,
  };
  return doc;
}
