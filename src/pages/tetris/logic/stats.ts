import type { Game } from './game';

// All relevant stats from a Single Game
export type Stats = {
  time: number;
  score: number;
  linesCleared: number;
  blocksPlaced: number;
};

/** Compare the stats, if A is the "best game" return `true` */
export function firstIsBest(A: Stats, B: Stats): boolean {
  if (A.linesCleared > B.linesCleared) return true;
  if (A.blocksPlaced > B.blocksPlaced) return true;
  // cleared same amount of tiles
  return A.time <= B.time;
}

export function equals(A: Stats, B: Stats): boolean {
  return (
    A.time === B.time &&
    A.score === B.score &&
    A.linesCleared === B.linesCleared &&
    A.blocksPlaced === B.blocksPlaced
  );
}

export function getStats(game: Game): Stats {
  const stats: Stats = {
    time: game.elapsedTime,
    score: game.score,
    linesCleared: game.linesCleared,
    blocksPlaced: game.blocksPlaced,
  };
  return stats;
}
