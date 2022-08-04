import { DocumentReference, DocumentSnapshot } from "firebase/firestore";

import { Difficulty } from "pages/minesweeper/logic";
import {
  createDocument,
  deleteDocument,
  updateDocument,
} from "services/firestore";

type Fields = {
  time: number;
  score: number;
  difficulty: Difficulty;
  victory: boolean;
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
        victory: data.victory,
        time: data.time,
        score: data.score,
        difficulty: data.difficulty,
        user: data.user,
      },
      snapshot.ref
    );
  }
}
