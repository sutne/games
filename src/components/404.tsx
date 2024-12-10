import { Typography } from '@mui/material';
import { Card } from './cards';

export function RouteNotFound() {
  return (
    <Card>
      <Typography
        variant='h2'
        fontWeight={700}
        textAlign='center'
        color='game.colors.red'
      >
        404
      </Typography>
      <Typography textAlign='center'>
        Oops, looks like you are looking for a page that doesn&apos;t currently
        exist
      </Typography>
    </Card>
  );
}
