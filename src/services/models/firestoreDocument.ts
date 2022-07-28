import { DocumentReference, DocumentSnapshot } from "firebase/firestore";

export abstract class FirestoreDocument {
  static readonly collectionName: string;
  readonly ref: DocumentReference;

  constructor(ref: DocumentReference) {
    this.ref = ref;
  }

  abstract toFirestore(): { [x: string]: any };
  static fromFirestore(snapshot: DocumentSnapshot): any {}
}
