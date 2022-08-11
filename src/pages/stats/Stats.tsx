import React from "react";

import { Card } from "components/cards/Card";
import { PageHeader } from "components/typography";

import { MinesweeperStats } from "./components/MinesweeperStats";

export function Stats() {
  return (
    <>
      <PageHeader header="Stats" />
      <MinesweeperStats />
    </>
  );
}
