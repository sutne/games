import React from "react";
import { Box } from "@mui/material";

type props = {
  onClick: () => void;
  children: JSX.Element | string;
  center?: boolean;
};
export function Link({ onClick, children, center }: props) {
  const classes = getClasses();
  return (
    <Box
      sx={classes.link}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </Box>
  );

  function getClasses() {
    return {
      link: {
        display: "inline-block",
        cursor: "pointer",
        color: "info.main",
        textAlign: center ? "center" : "left",
        "&:hover": {
          fontWeight: "500",
        },
      },
    };
  }
}
