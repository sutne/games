import React, { useEffect } from "react";
import { Difficulty, Game } from "../logic";
import { MinesweeperDocument } from "services/models/minesweeperDocument";

const GameContext = React.createContext<
  | { game: Game; setGame: React.Dispatch<React.SetStateAction<Game>> }
  | undefined
>(undefined);

type GameProviderProps = { difficulty: Difficulty; children: React.ReactNode };
export function GameProvider({ difficulty, children }: GameProviderProps) {
  const [game, setGame] = React.useState(new Game(difficulty));

  // Save score and time to firestore once game is over
  useEffect(() => {
    if (!game.isWon && !game.isLost) return;
    new MinesweeperDocument({
      user: "Sutne",
      time: 1,
      score: game.getScore(1),
      difficulty: difficulty,
    }).create();
  }, [game, difficulty]);

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
