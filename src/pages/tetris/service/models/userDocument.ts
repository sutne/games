import { updatePersonalBestList } from "utils/lists";

import { firstIsBest, Stats } from "../../logic/stats";

export type UserDocument = {
  totalTime: number;
  totalScore: number;
  linesCleared: number;
  blocksPlaced: number;
  best: Stats[];
};

/**
 * @param doc the old document
 * @param stats the stats to update the document with
 * @returns `[new document, insertion index]` where the insertion index is the
 * index at which the game is on the personal best list (or -1 if it wasn't good
 * enough);
 */
export function updateUserDocument(
  doc: UserDocument,
  stats: Stats
): UserDocument {
  doc.totalTime += stats.time;
  doc.totalScore += stats.score;
  doc.linesCleared += stats.linesCleared;
  doc.blocksPlaced += stats.blocksPlaced;
  doc.best = updatePersonalBestList(doc.best, stats, firstIsBest);
  return doc;
}

export function emptyUserDocument(): UserDocument {
  const doc: UserDocument = {
    totalScore: 0,
    totalTime: 0,
    linesCleared: 0,
    blocksPlaced: 0,
    best: [],
  };
  return doc;
}
