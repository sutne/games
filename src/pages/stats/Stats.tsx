import React from "react";

import { Card } from "components/cards/Card";
import { PageHeader } from "components/typography";

import { MinesweeperStats } from "./components";

export function Stats() {
  return (
    <Card>
      <PageHeader header="Stats" />
      <MinesweeperStats />
    </Card>
  );
}
