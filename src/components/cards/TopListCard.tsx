import React from "react";
import { Box, Stack, Typography } from "@mui/material";

import { Card } from "./Card";

type props = {
  title: string;
  headers: string[];
  items: string[][];
  highlightIndex?: number;
  type?: "bordered" | "elevated";
};
export function TopListCard({ type = "elevated", ...props }: props) {
  const classes = getClasses();
  return (
    <Card padding="12px" type={type}>
      <Typography variant="h4" textAlign="center" sx={classes.title}>
        {props.title}
      </Typography>
      <Stack direction="column" spacing={classes.spacing.column}>
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
        {props.items.map((item, i) => (
          <Stack key={i} direction="row" spacing={classes.spacing.row}>
            <Typography
              sx={classes.rank}
              fontWeight={props.highlightIndex === i ? "bold" : ""}
            >
              {i + 1}
            </Typography>
            {item.map((field) => (
              <Typography
                key={field}
                sx={classes.rowItem}
                fontWeight={props.highlightIndex === i ? "bold" : ""}
              >
                {field}
              </Typography>
            ))}
          </Stack>
        ))}
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
        margin: "6px 0",
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
    };
  }
}
