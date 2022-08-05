import React, { useEffect } from "react";

import { MinesweeperDocument } from "services/models/minesweeperDocument";

import { Difficulty, Game } from "../logic";

const GameContext = React.createContext<
  | { game: Game; setGame: React.Dispatch<React.SetStateAction<Game>> }
  | undefined
>(undefined);

type GameProviderProps = { difficulty: Difficulty; children: React.ReactNode };
export function GameProvider({ difficulty, children }: GameProviderProps) {
  const [game, setGame] = React.useState(new Game(difficulty));

  // Save score and time to firestore once game is over
  useEffect(() => {
    if (!game.isOver()) return;
    if (game.isSaved) return;
    if (!game.stats) return;
    new MinesweeperDocument({
      user: "undefined",
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

  return (
    <GameContext.Provider value={{ game, setGame }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): [Game, React.Dispatch<React.SetStateAction<Game>>] {
  const context = React.useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return [context.game, context.setGame];
}
