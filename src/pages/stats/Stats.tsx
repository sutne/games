import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";

import { getCollection } from "services/firebase/firestore";
import { MinesweeperDocument } from "services/firebase/models/minesweeperDocument";
import { convertTime } from "utils/time";

export function Stats() {
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
    const [minutes, seconds, milliseconds] = convertTime(doc.fields.time);
    return (
      <div key={doc.reference?.id}>
        <hr />
        <h3>user: {doc.fields.username}</h3>
        <h3>
          time: {minutes}:{seconds}:{milliseconds}
        </h3>
        <h3>difficulty: {doc.fields.difficulty}</h3>
        <h3>clear percentage: {doc.fields.clearPercentage}</h3>
        <h3>correct flags: {doc.fields.correctFlags}</h3>
      </div>
    );
  });
}
