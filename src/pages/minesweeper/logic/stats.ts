import { Difficulty } from "./difficulty";
import { Game } from "./game";

// All relevant stats from a Single Game
export type Stats = {
  difficulty: Difficulty;
  victory: boolean;
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

/** Return best of the two, used to sort the leaderboards */
export function comparator(A: Stats, B: Stats): 1 | -1 {
  const AisFirst = -1;
  const BisFirst = 1;
  // Winning is better than losing
  if (A.victory && !B.victory) return AisFirst;
  if (B.victory && !A.victory) return BisFirst;
  // If both games were won, the time decides
  if (A.victory && B.victory) return A.time < B.time ? AisFirst : BisFirst;
  // Both were lost, cleared tiles decide (assumes both are of same difficulty)
  return A.tiles.cleared > B.tiles.cleared ? AisFirst : BisFirst;
}

export function equals(A: Stats, B: Stats): boolean {
  return (
    A.time === B.time &&
    A.victory === B.victory &&
    A.flags.correct === B.flags.correct &&
    A.flags.placed === B.flags.placed &&
    A.tiles.notCleared === B.tiles.notCleared &&
    A.tiles.cleared === B.tiles.cleared &&
    A.difficulty === B.difficulty
  );
}

export function getStats(game: Game): Stats {
  const stats: Stats = {
    difficulty: game.difficulty,
    victory: game.isWon,
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
