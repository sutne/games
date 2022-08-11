import React from "react";
import { Box, Stack, Typography } from "@mui/material";

import { Card } from "./Card";

type props = {
  title: string;
  headers?: string[];
  items?: string[][];
  highlightIndex?: number;
  highlightColor?: string | undefined;
  type?: "bordered" | "elevated";
  children?: JSX.Element;
};
export function TopListCard(props: props) {
  const classes = getClasses();
  if (props.items && !props.headers)
    throw new Error("The items need their headers");
  return (
    <Card padding="12px" type={props.type ?? "elevated"}>
      <Typography variant="h4" textAlign="center" sx={classes.title}>
        {props.title}
      </Typography>
      <Stack direction="column" spacing={classes.spacing.column}>
        {props.headers ? (
          <Stack
            direction="row"
            spacing={classes.spacing.row}
            sx={classes.header}
          >
            <Box sx={classes.rank}> </Box>
            {props.headers.map((header) => (
              <Typography key={header} sx={classes.headerItem}>
                {header}
              </Typography>
            ))}
          </Stack>
        ) : (
          <></>
        )}
        {props.items?.map((item, i) => (
          <Stack
            key={i}
            direction="row"
            spacing={classes.spacing.row}
            sx={props.highlightIndex === i ? classes.highlight : undefined}
          >
            <Typography sx={classes.rank}>{i + 1}</Typography>
            {item.map((field) => (
              <Typography key={field} sx={classes.rowItem}>
                {field}
              </Typography>
            ))}
          </Stack>
        ))}
        {props.children}
      </Stack>
    </Card>
  );

  function getClasses() {
    return {
      spacing: {
        row: 2,
        column: 1,
      },
      card: {
        backgroundColor: "background.paper",
        borderRadius: "16px",
        boxShadow: 5,
        padding: "12px",
      },
      title: {
        marginBottom: "8px",
      },
      header: {
        marginTop: "6px",
      },
      rank: {
        flex: 1,
      },
      headerItem: {
        flex: 3,
        fontWeight: 600,
      },
      rowItem: {
        flex: 3,
      },
      highlight: {
        "& > *": {
          fontSize: "14pt",
          color: props.highlightColor ?? "info.success",
          fontWeight: 900,
        },
      },
    };
  }
}
