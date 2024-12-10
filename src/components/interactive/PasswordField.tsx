import * as Icons from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { TextField } from 'components/interactive';
import { useForm } from 'components/providers/FormProvider';
import { useState } from 'react';

type props = {
  id: string;
  field: { value: string; valid: boolean };
  onChange: (field: string, update: { value: string; valid: boolean }) => void;
  onEnterPress?: () => void;
};

export function PasswordField({ id, field, onChange, onEnterPress }: props) {
  const { showValidation } = useForm();
  const [hidden, setHidden] = useState(false);

  const validate = (password: string) => {
    if (password.length < 6)
      return 'Password must be at least 6 characters long';
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter' && onEnterPress) onEnterPress();
  };

  return (
    <TextField
      label={'password'}
      onChange={(value) => {
        onChange(id, {
          value: value,
          valid: validate(value) === undefined,
        });
      }}
      onKeyDown={handleKeyDown}
      error={!!(showValidation && validate(field.value))}
      helperText={showValidation && validate(field.value)}
      type={hidden ? 'text' : 'password'}
      value={field.value}
      icon={<Icons.Key />}
      end={
        <IconButton onClick={() => setHidden((hidden) => !hidden)} edge='end'>
          {hidden ? <Icons.VisibilityOff /> : <Icons.Visibility />}
        </IconButton>
      }
    />
  );
}
