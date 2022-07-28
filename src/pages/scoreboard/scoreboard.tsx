import { useEffect, useState } from "react";

import { getCollection } from "../services/firestore";
import { MinesweeperDocument } from "../services/models/minesweeperDocument";

export function Scoreboard() {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const getDocs = async () => {
      const data = await getCollection(
        "minesweeper",
        MinesweeperDocument.fromFirestore
      );
      setDocs(data);
    };

    getDocs();
  }, []);

  return (
    <>
      <p>Testing getting from database</p>
      {listDocs(docs)}
    </>
  );
}

function listDocs(docs) {
  if (docs.length > 0) {
    return docs.map((doc) => (
      <div key={doc.ref.id}>
        <hr />
        <h3>user: {doc.user}</h3>
        <h3>time: {doc.time}</h3>
        <h3>difficulty: {doc.difficulty}</h3>
        <h3>cleared: {doc.cleared}</h3>
      </div>
    ));
  } else {
    return <h3>...</h3>;
  }
}
