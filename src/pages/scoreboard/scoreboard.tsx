import { Typography } from "@mui/material";
import { Difficulty } from "pages/minesweeper/logic";
import { useEffect, useState } from "react";
import { formatTime } from "utils/time";

import { getCollection } from "../../services/firestore";
import { MinesweeperDocument } from "../../services/models/minesweeperDocument";

export function Scoreboard() {
  const [docs, setDocs] = useState<MinesweeperDocument[]>();

  useEffect(() => {
    const getDocs = async () => {
      const data = await getCollection(
        "minesweeper",
        MinesweeperDocument.fromFirestore
      );
      setDocs(data as MinesweeperDocument[]);
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

function listDocs(docs?: MinesweeperDocument[]) {
  if (!docs) return <h3>...</h3>;
  if (docs.length === 0) return <Typography>no scores :(</Typography>;
  return docs.map((doc) => {
    let [minutes, seconds, milliseconds] = formatTime(doc.fields.time);
    return (
      <div key={doc.reference!.id}>
        <hr />
        <h3>user: {doc.fields.user}</h3>
        <h3>
          time: {minutes}:{seconds}:{milliseconds}
        </h3>
        <h3>difficulty: {doc.fields.difficulty}</h3>
        <h3>score: {doc.fields.score}</h3>
      </div>
    );
  });
}
