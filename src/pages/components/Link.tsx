import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useTheme } from "@mui/material";

type LinkProps = {
  to: string;
  children: JSX.Element;
};

export function Link(props: LinkProps) {
  const theme = useTheme();
  return (
    <RouterLink
      to={props.to}
      style={{
        textDecoration: "none",
        color: theme.palette.text.primary,
      }}
    >
      {props.children}
    </RouterLink>
  );
}
