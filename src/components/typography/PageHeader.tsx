import React from "react";
import { Typography } from "@mui/material";

type props = {
  header: string;
};
export function PageHeader({ header }: props) {
  const classes = getClasses();
  return (
    <Typography variant="h3" sx={classes.title}>
      {header}
    </Typography>
  );

  function getClasses() {
    return {
      title: {
        textAlign: "center",
        paddingBottom: "24px",
        fontWeight: 600,
      },
    };
  }
}
