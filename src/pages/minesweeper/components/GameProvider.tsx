import React, { useState } from "react";

import { Difficulty, Game } from "../logic";

const GameContext = React.createContext<
  | { game: Game; updateGame: (callback: (game: Game) => void) => void }
  | undefined
>(undefined);

type props = {
  difficulty: Difficulty;
  children: JSX.Element;
};
export function GameProvider({ difficulty, children }: props) {
  const [game, setGame] = useState(new Game(difficulty));

  const updateGame = (callback: (prev: Game) => void) => {
    const copy = game.copy();
    callback(copy);
    setGame(copy);
  };

  const values = {
    game,
    updateGame,
  };
  return <GameContext.Provider value={values}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = React.useContext(GameContext);
  if (context === undefined) {
    throw new Error("useMinesweeper must be used within a MinesweeperProvider");
  }
  return { ...context };
}
