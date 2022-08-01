import React from "react";
import { Difficulty, Game } from "../logic";

const GameContext = React.createContext<
  | { game: Game; setGame: React.Dispatch<React.SetStateAction<Game>> }
  | undefined
>(undefined);

type GameProviderProps = { difficulty: Difficulty; children: React.ReactNode };
export function GameProvider({ difficulty, children }: GameProviderProps) {
  const [game, setGame] = React.useState(new Game(difficulty));
  return (
    <GameContext.Provider value={{ game, setGame }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): [Game, React.Dispatch<React.SetStateAction<Game>>] {
  const context = React.useContext(GameContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return [context.game, context.setGame];
}
