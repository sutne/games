import { Button as MuiButton } from '@mui/material';
import type { JSX } from 'react';
type props = {
  onClick: () => void;
  label: string;
  color?:
    | 'error'
    | 'primary'
    | 'inherit'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | undefined;
  icon?: JSX.Element;
};
export function Button(props: props) {
  return (
    <MuiButton
      variant='outlined'
      color={props.color}
      startIcon={props.icon}
      onClick={props.onClick}
      sx={{
        width: '100%',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        minWidth: 'max-content',
      }}
    >
      {props.label}
    </MuiButton>
  );
}
