import {
  addDoc,
  collection,
  deleteDoc,
  DocumentReference,
  DocumentSnapshot,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { firestore } from "./firebase";

export async function createDocument(
  collectionName: string,
  data: { [key: string]: any }
) {
  return await addDoc(collection(firestore, collectionName), data);
}

export async function updateDocument(
  data: { [key: string]: any },
  ref?: DocumentReference
) {
  if (ref === undefined)
    throw new Error("Cannot update document without a reference");
  return await updateDoc(ref, data);
}

export async function deleteDocument(ref?: DocumentReference) {
  if (ref === undefined)
    throw new Error("Cannot delete document without a reference");
  return await deleteDoc(ref);
}

export async function getCollection(
  name: string,
  converter: (doc: DocumentSnapshot) => any
): Promise<{ [key: string]: any }[]> {
  const querySnapshot = await getDocs(collection(firestore, name));
  const documents: { [key: string]: any }[] = [];
  querySnapshot.forEach((doc: DocumentSnapshot) => {
    console.log(doc.id, " => ", doc.data());
    documents.push(converter(doc));
  });
  return documents;
}
