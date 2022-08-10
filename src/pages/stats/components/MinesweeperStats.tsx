import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import { useAuth } from "components/providers/AuthProvider";
import { UserDocument } from "pages/minesweeper/service/models";
import { readDocument } from "services/firebase/firestore";
import { timeString } from "utils/time";

export function MinesweeperStats() {
  const [doc, setDoc] = useState<UserDocument>();
  const { user } = useAuth();

  useEffect(() => {
    const getDoc = async () => {
      const data = await readDocument<UserDocument>(`minesweeper/${user.uid}`);
      if (!data) return;
      setDoc(data);
    };
    getDoc();
  }, []);

  if (!doc) return <Box>Loading ...</Box>;

  const gamesPlayed = () => {
    return (
      doc.beginner.games.played +
      doc.intermediate.games.played +
      doc.expert.games.played
    );
  };
  const gamesWon = () => {
    return (
      doc.beginner.games.won + doc.intermediate.games.won + doc.expert.games.won
    );
  };

  return (
    <Box>
      {doc ? (
        <>
          <Typography variant="h4">{"Minesweeper"}</Typography>
          <Typography>{"Cleared Tiles" + doc.tiles.cleared}</Typography>
          <Typography>{"Uncleared Tiles" + doc.tiles.notCleared}</Typography>
          <Typography>{"Flags placed" + doc.flags.placed}</Typography>
          <Typography>{"Bombs Flagged" + doc.flags.correct}</Typography>
          <Typography>{"GamesWon" + gamesWon()}</Typography>
          <Typography>{"GamesPlayed" + gamesPlayed()}</Typography>
          <Typography>{"Time PLayed " + timeString(doc.totalTime)}</Typography>
          {doc.beginner.best.map((game, i) => (
            <Typography key={i}>{game.time}</Typography>
          ))}
          {doc.intermediate.best.map((game, i) => (
            <Typography key={i}>{game.time}</Typography>
          ))}
          {doc.expert.best.map((game, i) => (
            <Typography key={i}>{game.time}</Typography>
          ))}
        </>
      ) : (
        <Typography>...</Typography>
      )}
    </Box>
  );
}
