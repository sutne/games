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
  return (
    <Card padding='12px'>
      <Header header={header} />
      <Stats items={items} highlight={highlight} />
      <Actions actions={actions} />
    </Card>
  );
}

function Header(props: { header: string }) {
  return <Typography variant='h4'>{props.header}</Typography>;
}

function Stats(props: { items: StatItem[]; highlight?: boolean }) {
  const classes = getClasses();

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      divider={<Divider orientation='vertical' flexItem />}
      justifyContent='space-evenly'
      spacing={1}
      sx={classes.statRow}
    >
      {props.items.map((item) => (
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
        color: props.highlight ? 'info.main' : 'text.primary',
        transition: 'color 0.5s ease',
      },
    };
  }
}

function Actions(props: { actions?: GameCardAction[] }) {
  if (!props.actions) return <></>;
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
      {props.actions.map((item) => (
        <Button
          key={item.description}
          label={item.description}
          onClick={item.action}
          icon={item.icon}
        />
      ))}
    </Stack>
  );
}
