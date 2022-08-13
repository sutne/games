import React, { useState } from "react";

import { Difficulty } from "../logic/difficulty";
import { Game } from "../logic/game";

const GameContext = React.createContext<
  | {
      game: Game;
      updateGame: (callback: (game: Game) => void) => void;
      replay: () => void;
    }
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

  const replay = () => {
    setGame(new Game(game.difficulty));
  };

  const values = {
    game,
    updateGame,
    replay,
  };
  return <GameContext.Provider value={values}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = React.useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return { ...context };
}
