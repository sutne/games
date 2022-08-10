import React from "react";
import { Box } from "@mui/material";

type props = {
  children: JSX.Element | JSX.Element[] | string;
};
export function Card({ children }: props) {
  const classes = getClasses();
  return <Box sx={classes.card}>{children}</Box>;

  function getClasses() {
    return {
      card: {
        backgroundColor: "background.paper",
        borderRadius: "16px",
        padding: "32px",
        boxShadow: 5,
      },
    };
  }
}
