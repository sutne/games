import { Difficulty } from "pages/minesweeper/logic/difficulty";
import { updatePersonalBestList } from "utils/lists";

import { firstIsBest, Stats } from "../../logic/stats";

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

/**
 * @param doc the old document
 * @param difficulty the difficulty of the game
 * @param stats the stats to update the document with
 * @returns `[new document, insertion index]` where the insertion index is the
 * index at which the game is on the personal best list (or -1 if it wasn't good
 * enough);
 */
export function updateUserDocument(
  doc: UserDocument,
  difficulty: Difficulty,
  stats: Stats
): UserDocument {
  doc.totalTime += stats.time;
  doc.flags.correct += stats.flags.correct;
  doc.flags.placed += stats.flags.placed;
  doc.tiles.cleared += stats.tiles.cleared;
  doc.tiles.notCleared += stats.tiles.notCleared;
  doc[difficulty].games.played += 1;
  doc[difficulty].games.won += stats.tiles.notCleared === 0 ? 1 : 0;
  doc[difficulty].best = updatePersonalBestList(
    doc[difficulty].best,
    stats,
    firstIsBest
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
