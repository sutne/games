import React from "react";
import { IconButton as MuiIconButton } from "@mui/material";

type props = {
  icon: JSX.Element;
  onClick: () => void;
};
export function IconButton(props: props) {
  return (
    <MuiIconButton
      size="large"
      sx={{ color: "text.secondary" }}
      onClick={props.onClick}
      onMouseDown={(e) => e.preventDefault()}
    >
      {props.icon}
    </MuiIconButton>
  );
}
