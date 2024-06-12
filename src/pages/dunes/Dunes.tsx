import React from "react";

import { PageHeader } from "components/typography";

import { Mouse } from "./logic/Mouse";
import { World } from "./logic/World";
import { AdjustRules } from "./AdjustRules";
import { Canvas } from "./Canvas";
import { RuleSet } from "./RuleSet";

/** a basic canvas application where each pixel represents a pice of sand */
export function Dunes() {
  const ruleset = new RuleSet({ cursorSize: 9 });
  const mouse = new Mouse();
  const world = new World(400, 200, ruleset);

  return (
    <>
      <PageHeader header="Dunes" />
      <Canvas world={world} mouse={mouse} />
      <AdjustRules ruleset={ruleset} />
    </>
  );
}
