import { DocumentReference, DocumentSnapshot } from "firebase/firestore";

import { MinesweeperDifficulty } from "pages/minesweeper/minesweeper";
import {
  createDocument,
  deleteDocument,
  updateDocument,
} from "services/firebase/firestore";

type Fields = {
  difficulty: MinesweeperDifficulty;
  victory: boolean;
  time: number;
  clearPercentage: number;
  correctFlags: number;
  uid: string;
  username: string;
};

export class MinesweeperDocument {
  fields: Fields;
  reference?: DocumentReference;

  constructor(fields: Fields, reference?: DocumentReference) {
    this.fields = fields;
    this.reference = reference;
  }

  create() {
    createDocument("minesweeper", this.fields);
  }

  update() {
    updateDocument(this.fields, this.reference);
  }

  delete() {
    deleteDocument(this.reference);
  }

  static fromFirestore(snapshot: DocumentSnapshot) {
    const data = snapshot.data();
    if (!data) return undefined;
    return new MinesweeperDocument(
      {
        difficulty: data.difficulty,
        victory: data.victory,
        time: data.time,
        clearPercentage: data.clearPercentage,
        correctFlags: data.correctFlags,
        uid: data.uid,
        username: data.username,
      },
      snapshot.ref
    );
  }
}
