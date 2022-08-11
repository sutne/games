import { Game } from "./game";

// All relevant stats from a Single Game
export type Stats = {
  time: number;
  tiles: {
    cleared: number;
    notCleared: number; // remaining and hidden non-bomb tiles
  };
  flags: {
    placed: number;
    correct: number;
  };
};

/** Compare the stats, if A is the "best game" return `true` */
export function firstIsBest(A: Stats, B: Stats): boolean {
  if (A.tiles.cleared > B.tiles.cleared) return true;
  if (A.tiles.cleared < B.tiles.cleared) return false;
  // cleared same amount of tiles
  return A.time <= B.time;
}

export function equals(A: Stats, B: Stats): boolean {
  return (
    A.time === B.time &&
    A.flags.correct === B.flags.correct &&
    A.flags.placed === B.flags.placed &&
    A.tiles.notCleared === B.tiles.notCleared &&
    A.tiles.cleared === B.tiles.cleared
  );
}

export function getStats(game: Game): Stats {
  const stats: Stats = {
    time: game.elapsedTime,
    flags: {
      correct: 0,
      placed: 0,
    },
    tiles: {
      cleared: 0,
      notCleared: 0,
    },
  };
  for (const row of game.board) {
    for (const tile of row) {
      if (tile.isHidden && !tile.isMine) stats.tiles.notCleared += 1;
      if (!tile.isHidden && !tile.isMine) stats.tiles.cleared += 1;
      if (tile.isFlagged) {
        stats.flags.placed += 1;
        if (tile.isMine) stats.flags.correct += 1;
      }
    }
  }
  return stats;
}
