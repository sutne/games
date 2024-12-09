import { Typography } from '@mui/material';

type props = {
  header: string;
};
export function PageHeader({ header }: props) {
  const classes = getClasses();
  return (
    <Typography variant='h3' sx={classes.title}>
      {header}
    </Typography>
  );

  function getClasses() {
    return {
      title: {
        textAlign: 'center',
        marginBottom: '16px',
        fontWeight: 600,
      },
    };
  }
}
