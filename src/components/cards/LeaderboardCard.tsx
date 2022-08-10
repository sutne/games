import React from "react";

import { TopCard } from ".";

type props = {
  headers: string[];
  items: string[][];
};
export function LeaderboardCard(props: props) {
  return (
    <TopCard title="Leaderboard" headers={props.headers} items={props.items} />
  );
}
