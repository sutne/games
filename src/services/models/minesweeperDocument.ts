import { DocumentReference, DocumentSnapshot } from "firebase/firestore";

import { Difficulty } from "pages/minesweeper/logic";
import {
  createDocument,
  deleteDocument,
  updateDocument,
} from "services/firestore";

type Fields = {
  difficulty: Difficulty;
  victory: boolean;
  time: number;
  clearPercentage: number;
  correctFlags: number;
  user?: string;
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
        user: data.user,
      },
      snapshot.ref
    );
  }
}
