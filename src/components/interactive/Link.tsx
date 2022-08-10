import React from "react";
import { Box } from "@mui/material";

type props = {
  onClick: () => void;
  children: JSX.Element | string;
};
export function Link({ onClick, children }: props) {
  const classes = getClasses();
  return (
    <Box sx={classes.link} onClick={onClick}>
      {children}
    </Box>
  );

  function getClasses() {
    return {
      link: {
        display: "inline-block",
        cursor: "pointer",
        color: "info.main",
        textDecoration: "underline",
        "&:hover": {
          fontWeight: "500",
        },
      },
    };
  }
}
