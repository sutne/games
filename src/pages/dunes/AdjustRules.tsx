import React from "react";
import { Stack } from "@mui/material";

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

  function toggleRightClickAction() {
    props.ruleset.rightClickAction = props.ruleset.rightClickAction === "erase" ? "solid" : "erase";
    forceUpdate();
  }

  return (
    <Stack direction="row" gap="8px">
      <Button label={props.ruleset.isPaused ? "Play" : "Pause"} onClick={togglePause} />
      <Button label={"right click: " + props.ruleset.rightClickAction} onClick={toggleRightClickAction} />
    </Stack>
  );
}
