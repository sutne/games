import React from "react";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";

import { AutoScroll } from "../functional/AutoScroll";

type StatItem = {
  title: string;
  value: any;
};
type GameCardAction = {
  icon: any;
  description: string;
  action: () => any;
};

type GameStatCardProps = {
  header: string;
  items: StatItem[];
  actions?: GameCardAction[];
};

export function StatCard({ header, items, actions }: GameStatCardProps) {
  const classes = getClasses();
  return (
    <AutoScroll>
      <Box sx={classes.card}>
        <Typography variant="h4" sx={classes.header}>
          {header}
        </Typography>
        <Stack
          direction="row"
          sx={classes.statRow}
          divider={<Divider orientation="vertical" flexItem />}
          spacing={1}
        >
          {items.map((item) => (
            <Stack key={item.title} sx={classes.statItem}>
              <Typography variant="h6" textAlign="center">
                {item.title}
              </Typography>
              <Typography variant="h4" textAlign="center">
                {item.value}
              </Typography>
            </Stack>
          ))}
        </Stack>
        {actions ? (
          <Stack direction="row" sx={classes.buttonRow} spacing={1}>
            {actions.map((item) => (
              <Button
                variant="outlined"
                key={item.description}
                sx={classes.buttonItem}
                onClick={item.action}
                startIcon={<item.icon />}
              >
                {item.description}
              </Button>
            ))}
          </Stack>
        ) : (
          <></>
        )}
      </Box>
    </AutoScroll>
  );

  function getClasses() {
    return {
      card: {
        padding: "12px",
        boxShadow: 5,
        backgroundColor: "background.paper",
        borderRadius: "16px",
      },
      header: {
        marginTop: "6px",
        marginBottom: "12px",
      },
      statRow: {},
      statItem: {
        width: "100%",
        textAlign: "center",
      },
      buttonRow: {
        marginTop: "12px",
      },
      buttonItem: {
        width: "100%",
        textAlign: "center",
        fontWeight: "bold",
      },
    };
  }
}
