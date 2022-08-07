import React, { useEffect, useState } from "react";

import { getUser } from "services/firebase/auth";
import { MinesweeperDocument } from "services/firebase/models/minesweeperDocument";

import { Minesweeper, MinesweeperDifficulty } from "../minesweeper";

const MinesweeperContext = React.createContext<
  | {
      game: Minesweeper | undefined;
      updateGame: (callback: (game: Minesweeper) => void) => void;
      setDifficulty: (difficulty: MinesweeperDifficulty) => void;
      replay: () => void;
      clear: () => void;
    }
  | undefined
>(undefined);

type props = {
  children: JSX.Element;
};
export function MinesweeperProvider({ children }: props) {
  const [game, setGame] = useState<Minesweeper>();

  const replay = () => {
    if (!game) return;
    setGame(new Minesweeper(game.difficulty));
  };

  const setDifficulty = (difficulty: MinesweeperDifficulty) => {
    setGame(new Minesweeper(difficulty));
  };

  const updateGame = (callback: (game: Minesweeper) => void) => {
    if (!game) return;
    const copy = game.copy();
    callback(copy);
    setGame(copy);
  };

  const clear = () => {
    setGame(undefined);
  };

  // Save score and time to firestore once game is over
  useEffect(() => {
    const user = getUser();
    if (!game) return;
    if (!user.isSignedIn || !user.uid || !user.username) return;
    if (!game.isOver()) return;
    if (game.isSaved) return;
    new MinesweeperDocument({
      username: user.username,
      uid: user.uid,
      time: game.stats.time,
      clearPercentage: game.stats.clearPercentage,
      correctFlags: game.stats.numCorrectFlags,
      victory: game.isWon,
      difficulty: game.difficulty,
    }).create();
    const copy = game.copy();
    copy.isSaved = true;
    setGame(copy);
  }, [game]);

  const contextContent = {
    game,
    updateGame,
    setDifficulty,
    replay,
    clear,
  };

  return (
    <MinesweeperContext.Provider value={contextContent}>
      {children}
    </MinesweeperContext.Provider>
  );
}

export function useMinesweeper() {
  const context = React.useContext(MinesweeperContext);
  if (context === undefined) {
    throw new Error("useMinesweeper must be used within a MinesweeperProvider");
  }
  return { ...context };
}
