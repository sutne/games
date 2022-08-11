import React from "react";
import { Box } from "@mui/material";

type props = {
  children: JSX.Element | JSX.Element[] | string;
  color?: string;
  type?: "elevated" | "bordered";
  padding?: string;
};
export function Card({ type = "elevated", ...props }: props) {
  const classes = getClasses();
  return <Box sx={classes.card}>{props.children}</Box>;

  function getClasses() {
    return {
      card: [
        {
          backgroundColor: props.color ?? "background.paper",
          borderRadius: "16px",
          padding: props.padding ?? "32px",
        },
        type === "elevated" && {
          boxShadow: 5,
        },
        type === "bordered" && {
          boxShadow: "0px 0px 0px 1pt rgba(0,0,0,0.3)",
        },
      ],
    };
  }
}
