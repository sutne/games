import React from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";

import { Button } from "components/interactive";

import { AutoScroll } from "../functional/AutoScroll";

type StatItem = {
  title: string;
  value: any;
};
type GameCardAction = {
  icon: JSX.Element;
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

  const Header = () => {
    return <Typography variant="h4">{header}</Typography>;
  };

  const Stats = () => {
    return (
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        justifyContent="space-evenly"
        spacing={1}
        sx={classes.statRow}
      >
        {items.map((item) => (
          <Stack key={item.title} sx={classes.statItem}>
            <Typography variant="h6" textAlign="center" noWrap>
              {item.title}
            </Typography>
            <Typography variant="h4" textAlign="center">
              {item.value}
            </Typography>
          </Stack>
        ))}
      </Stack>
    );
  };

  const Actions = () => {
    if (!actions) return <></>;
    return (
      <Stack direction="row" spacing={1}>
        {actions.map((item) => (
          <Button
            key={item.description}
            label={item.description}
            onClick={item.action}
            icon={item.icon}
          />
        ))}
      </Stack>
    );
  };

  return (
    <AutoScroll>
      <Box sx={classes.card}>
        <Header />
        <Stats />
        <Actions />
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
      statRow: {
        margin: "16px 0",
      },
      statItem: {
        flex: 1,
        textAlign: "center",
      },
    };
  }
}
