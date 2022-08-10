import {
  createDocument,
  readDocument,
  updateDocument,
} from "services/firebase/firestore";

import { Stats } from "../logic/stats";
import { Leaderboard, updateLeaderboard } from "./models";

/**
 * Reads the leaderboard from the database, updates it with the new stats,
 * and saves the document in firestore before returning the updated leaderboard.
 *
 * If the document doesn't exist it will be created.
 */
export async function updateAndGetLeaderboard(
  difficulty: string,
  username: string,
  stats: Stats
): Promise<Leaderboard> {
  const path = `minesweeper/leaderboard/${difficulty}`;
  let data = await readDocument<Leaderboard>(path);
  if (!data) {
    data = {
      leaderboard: [{ user: username, game: stats }],
    } as Leaderboard;
    await createDocument(path, data);
  } else {
    data = updateLeaderboard(data, username, stats);
    await updateDocument(path, data);
  }
  return data;
}
