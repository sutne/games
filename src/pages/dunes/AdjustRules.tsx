import React from "react";

import { Button } from "../../components/interactive";
import { RuleSet } from "./RuleSet";

/** a basic canvas application where each pixel represents a pice of sand */
export function AdjustRules(props: { ruleset: RuleSet }) {
  const [, updateState] = React.useState({});
  const forceUpdate = React.useCallback(() => updateState({}), []);

  function togglePause() {
    props.ruleset.isPaused = !props.ruleset.isPaused;
    forceUpdate();
  }

  return (
    <>
      <Button label={props.ruleset.isPaused ? "Play" : "Pause"} onClick={togglePause} />
    </>
  );
}
