import { useEffect, useState } from "react";

import { getCollection } from "../services/firestore";
import { MinesweeperDocument } from "../services/models/minesweeperDocument";

function Minesweeper() {
  const [docs, setDocs] = useState([]);

  const getDocs = async () => {
    const data = await getCollection(
      MinesweeperDocument.collectionName,
      MinesweeperDocument.fromFirestore
    );
    setDocs(data);
  };

  useEffect(() => getDocs());

  return (
    <div>
      <p>testing getting from database</p>
      {docs.map((doc) => {
        return (
          <div key={doc.ref.id}>
            <h2>user: {doc.user}</h2>
            <h2>time: {doc.time}</h2>

            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default Minesweeper;
