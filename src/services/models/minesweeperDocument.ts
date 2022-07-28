import { DocumentReference, DocumentSnapshot } from "firebase/firestore";
import { FirestoreDocument } from "./firestoreDocument";
import { Difficulty } from "../../pages/minesweeper/logic";

export class MinesweeperDocument extends FirestoreDocument {
  collectionName = "minesweeper";

  user: string;
  time: number;
  cleared: number;
  difficulty: Difficulty;

  constructor(
    ref: DocumentReference,
    user: string,
    time: number,
    cleared: number,
    difficulty: Difficulty
  ) {
    super(ref);
    this.user = user;
    this.time = time;
    this.cleared = cleared;
    this.difficulty = difficulty;
  }

  toFirestore() {
    return {
      user: this.user,
      time: this.time,
      cleared: this.cleared,
      difficulty: this.difficulty,
    };
  }

  static fromFirestore(snapshot: DocumentSnapshot) {
    const data = snapshot.data();
    if (!data) return undefined;
    return new MinesweeperDocument(
      snapshot.ref,
      data.user,
      data.time,
      data.cleared,
      data.difficulty
    );
  }
}
