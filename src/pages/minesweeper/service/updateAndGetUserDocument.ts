import {
  createDocument,
  readDocument,
  updateDocument,
} from "services/firebase/firestore";

import { Difficulty } from "../logic/difficulty";
import { Stats } from "../logic/stats";
import {
  emptyUserDocument,
  updateUserDocument,
  UserDocument,
} from "./models/userDocument";

/**
 * Reads the user document from the database, updates it with the new stats,
 * and saves the new document in firestore before returning the updated data.
 *
 * If the document doesn't exist it will be created.
 *
 * @returns The updated document, and the "rank"/insertion index the game is
 * on the users personal best list.
 */
export async function updateAndGetUserDocument(
  uid: string,
  difficulty: Difficulty,
  newStats: Stats
): Promise<UserDocument> {
  const path = `minesweeper/${uid}`;
  let doc = await readDocument<UserDocument>(path);
  if (!doc) {
    // Document doesn't exist
    doc = emptyUserDocument();
    doc = updateUserDocument(doc, difficulty, newStats);
    await createDocument<UserDocument>(path, doc);
  } else {
    doc = updateUserDocument(doc, difficulty, newStats);
    await updateDocument(path, doc);
  }
  return doc;
}
