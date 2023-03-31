import React, { useEffect, useState } from "react";
import * as Icons from "@mui/icons-material";

import { FadeIn } from "components/animations/FadeIn";
import { StatCard } from "components/cards/StatCard";
import { AutoScroll } from "components/functional";
import { timeString } from "utils/time";

import { getStats } from "../../logic/stats";
import { useGame } from "../GameProvider";

export function GameStats() {
  const { game, replay } = useGame();
  const stats = getStats(game);

  const [time, setTime] = useState("");
  const [blocks, setBlocks] = useState("");
  const [cleared, setCleared] = useState("");

  useEffect(() => {
    if (!game.isOver) return;
    setTime(timeString(stats.time));
    setCleared(`${stats.linesCleared}`);
    setBlocks(`${stats.blocksPlaced}`);
  }, [game.isOver]);

  return (
    <FadeIn trigger={game.isOver}>
      <AutoScroll>
        <StatCard
          header="Game Over"
          items={[
            { title: "Time", value: time },
            { title: "Cleared", value: cleared },
            { title: "Blocks Placed", value: blocks },
          ]}
          actions={[
            {
              icon: <Icons.Replay />,
              description: "Replay",
              action: () => replay(),
            },
          ]}
        />
      </AutoScroll>
    </FadeIn>
  );
}
