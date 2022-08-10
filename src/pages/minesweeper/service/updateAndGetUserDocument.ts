import {
  createDocument,
  readDocument,
  updateDocument,
} from "services/firebase/firestore";

import { Stats } from "../logic/stats";
import { emptyUserDocument, updateUserDocument, UserDocument } from "./models";

/**
 * Reads the user document from the database, updates it with the new stats,
 * and saves the new document in firestore before returning the updated data.
 *
 * If the document doesn't exist it will be created.
 */
export async function updateAndGetUserDocument(
  uid: string,
  newStats: Stats
): Promise<UserDocument> {
  const path = `minesweeper/${uid}`;
  let doc = await readDocument<UserDocument>(path);
  if (!doc) {
    // Document doesn't exist
    doc = emptyUserDocument();
    doc = updateUserDocument(doc, newStats);
    await createDocument<UserDocument>(path, doc);
  } else {
    doc = updateUserDocument(doc, newStats);
    await updateDocument(path, doc);
  }
  return doc;
}
