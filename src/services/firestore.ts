import { firestore } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  doc,
  DocumentSnapshot,
} from "firebase/firestore";

import { FirestoreDocument } from "./models/firestoreDocument";

export async function getCollection(
  name: string,
  converter: Function
): Promise<FirestoreDocument[]> {
  const querySnapshot = await getDocs(collection(firestore, name));
  let documents: FirestoreDocument[] = [];
  querySnapshot.forEach((doc: DocumentSnapshot) => {
    console.log(doc.id, " => ", doc.data());
    documents.push(converter(doc));
  });
  return documents;
}

export async function createDocument(document: FirestoreDocument) {
  const collectionName = Object.getPrototypeOf(document).collectionName;
  console.log("collectionName: ", collectionName);
  const theCollection = collection(firestore, collectionName);
  return await addDoc(theCollection, document.toFirestore());
}

export async function updateDocument(document: FirestoreDocument) {
  return await updateDoc(document.ref, document.toFirestore());
}

export async function deleteDocument(document: FirestoreDocument) {
  return await deleteDoc(document.ref);
}
