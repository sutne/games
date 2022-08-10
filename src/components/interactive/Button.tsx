import React from "react";
import { SvgIconComponent } from "@mui/icons-material";
import { Button as MuiButton } from "@mui/material";

type props = {
  onClick: () => void;
  label: string;
  icon: SvgIconComponent;
};
export function Button({ onClick, label }: props) {
  return (
    <MuiButton variant="outlined" onClick={onClick}>
      {label}
    </MuiButton>
  );
}
