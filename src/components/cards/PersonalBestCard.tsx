import React from "react";

import { TopCard } from "./TopCard";

type props = {
  headers: string[];
  items: string[][];
};
export function PersonalBestCard(props: props) {
  return (
    <TopCard
      title="Personal Best"
      headers={props.headers}
      items={props.items}
    />
  );
}
