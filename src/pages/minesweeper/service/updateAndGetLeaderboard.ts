import {
  createDocument,
  readDocument,
  updateDocument,
} from "services/firebase/firestore";

import { Difficulty } from "../logic/difficulty";
import { Stats } from "../logic/stats";
import { LeaderboardEntry } from "../service/models/leaderboards";
import { Leaderboards, updateLeaderboards } from "./models/leaderboards";

/**
 * Reads the leaderboard from the database, updates it with the new stats,
 * and saves the document in firestore before returning the updated leaderboard.
 *
 * If the document doesn't exist it will be created.
 */
export async function updateAndGetLeaderboard(
  difficulty: Difficulty,
  username: string,
  stats: Stats
): Promise<LeaderboardEntry[]> {
  const path = `leaderboards/minesweeper`;
  const entry: LeaderboardEntry = { user: username, game: stats };
  let leaderboards = await readDocument<Leaderboards>(path);
  if (!leaderboards) {
    leaderboards = {
      beginner: [],
      intermediate: [],
      expert: [],
    };
    leaderboards[difficulty].push(entry);
    await createDocument(path, leaderboards);
  } else {
    leaderboards = updateLeaderboards(
      leaderboards,
      difficulty,
      username,
      stats
    );
    await updateDocument(path, leaderboards);
  }
  return leaderboards[difficulty];
}
