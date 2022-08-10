import React, { useState } from "react";

import { Card } from "components/cards";
import { PageHeader } from "components/typography";

import { DifficultySelector } from "./components/DifficultySelector";
import { GameArea } from "./components/GameArea";
import { GameProvider } from "./components/GameProvider";
import { Difficulty } from "./logic";

export function Minesweeper() {
  const [difficulty, setDifficulty] = useState<Difficulty>();

  return (
    <Card>
      <PageHeader header="Minesweeper" />
      {!difficulty ? (
        <DifficultySelector setDifficulty={setDifficulty} />
      ) : (
        <GameProvider difficulty={difficulty}>
          <GameArea setDifficulty={setDifficulty} />
        </GameProvider>
      )}
    </Card>
  );
}
