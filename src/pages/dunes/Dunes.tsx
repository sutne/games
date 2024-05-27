import React from "react";

import { PageHeader } from "components/typography";

import { AdjustRules } from "./AdjustRules";
import { Canvas } from "./Canvas";
import { RuleSet } from "./RuleSet";

/** a basic canvas application where each pixel represents a pice of sand */
export function Dunes() {
  const ruleset = new RuleSet();

  return (
    <>
      <PageHeader header="Dunes" />
      <Canvas ruleset={ruleset} />
      <AdjustRules ruleset={ruleset} />
    </>
  );
}
