import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { firebaseApp } from "./firebase";

const firestore = getFirestore(firebaseApp);

export async function createDocument<T>(path: string, data: T) {
  return setDoc(doc(firestore, path), data, { merge: true });
}

export async function readDocument<T>(path: string): Promise<T | void> {
  const snapshot = await getDoc(doc(firestore, path));
  if (!snapshot.exists() || !snapshot.data()) return;
  return snapshot.data() as T;
}

export async function updateDocument<T>(path: string, data: T) {
  return updateDoc(doc(firestore, path), data);
}
