import { Typography } from '@mui/material';
import { Card } from './cards';

export function RouteNotFound() {
  return (
    <Card>
      <Typography
        variant='h2'
        color='game.colors.red'
        sx={{ fontWeight: 700, textAlign: 'center' }}
      >
        404
      </Typography>
      <Typography sx={{ textAlign: 'center' }}>
        Oops, looks like you are looking for a page that doesn&apos;t currently
        exist
      </Typography>
    </Card>
  );
}
