import { InputAdornment, TextField as MuiTextField } from '@mui/material';
import type { JSX } from 'react';

type props = {
  error: boolean | undefined;
  helperText: string | undefined | boolean;
  label: string;
  value: string | undefined;
  type?: string;
  onChange: (value: string) => void;
  icon?: JSX.Element;
  end?: JSX.Element;
  onKeyDown?: (event: any) => void;
  disabled?: boolean;
};
export function TextField(props: props) {
  return (
    <MuiTextField
      variant='outlined'
      disabled={props.disabled ?? false}
      onChange={(e) => props.onChange(e.target.value)}
      type={props.type}
      error={props.error}
      helperText={props.helperText}
      placeholder={props.label}
      autoComplete={props.label}
      value={props.value}
      onKeyDown={props.onKeyDown}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            {props.icon ? props.icon : <></>}
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position='end'>
            {props.end ? props.end : <></>}
          </InputAdornment>
        ),
      }}
    />
  );
}
