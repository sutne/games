import { Divider, Stack, Typography } from '@mui/material';
import { Button } from 'components/interactive';
import type { JSX } from 'react';
import { Card } from './Card';

type StatItem = {
  title: string;
  value: string;
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
  highlight?: boolean;
};

export function StatCard({
  header,
  items,
  actions,
  highlight,
}: GameStatCardProps) {
  const classes = getClasses();

  const Header = () => {
    return <Typography variant='h4'>{header}</Typography>;
  };

  const Stats = () => {
    return (
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        divider={<Divider orientation='vertical' flexItem />}
        justifyContent='space-evenly'
        spacing={1}
        sx={classes.statRow}
      >
        {items.map((item) => (
          <Stack key={item.title} sx={classes.statItem} textAlign='center'>
            <Typography variant='h6' noWrap>
              {item.title}
            </Typography>
            <Typography variant='h4' sx={classes.itemValue}>
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
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
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
    <Card padding='12px'>
      <Header />
      <Stats />
      <Actions />
    </Card>
  );

  function getClasses() {
    return {
      statRow: {
        margin: '16px 0',
      },
      statItem: {
        flex: 1,
        textAlign: 'center',
      },
      itemValue: {
        fontWeight: '600',
        color: highlight ? 'info.main' : 'text.primary',
        transition: 'color 0.5s ease',
      },
    };
  }
}
