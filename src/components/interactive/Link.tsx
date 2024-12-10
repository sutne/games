import { Typography } from '@mui/material';
import type { JSX } from 'react';
type props = {
  onClick: () => void;
  children: JSX.Element | string;
  center?: boolean;
};
export function Link({ onClick, children, center }: props) {
  const classes = getClasses();
  return (
    <Typography
      component='span'
      sx={classes.link}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </Typography>
  );

  function getClasses() {
    return {
      link: {
        display: 'inline-block',
        cursor: 'pointer',
        color: 'info.main',
        textAlign: center ? 'center' : 'left',
        '&:hover': {
          fontWeight: '500',
        },
      },
    };
  }
}
