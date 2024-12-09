import React, { useState } from "react";
import { type JSX } from "react";
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
  children: JSX.Element;
};
export function GameProvider({ children }: props) {
  const [game, setGame] = useState(new Game());

  const updateGame = (callback: (prev: Game) => void) => {
    const copy = game.copy();
    callback(copy);
    setGame(copy);
  };

  const replay = () => {
    setGame(new Game());
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
