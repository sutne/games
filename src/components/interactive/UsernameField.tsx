import * as Icons from '@mui/icons-material';
import { TextField } from 'components/interactive';
import { useForm } from '../providers/FormProvider';

type props = {
  field: { value: string; valid: boolean };
  onChange: (field: string, update: { value: string; valid: boolean }) => void;
};
export function UsernameField({ field, onChange }: props) {
  const { showValidation } = useForm();

  const validate = (username: string) => {
    if (username.length < 5 || 12 < username.length)
      return 'Username must be between 5 and 12 characters long';
  };

  return (
    <TextField
      label='username'
      icon={<Icons.Person />}
      onChange={(value) => {
        onChange('username', {
          value: value,
          valid: validate(value) === undefined,
        });
      }}
      value={field.value}
      error={!!(showValidation && validate(field.value))}
      helperText={
        showValidation && validate(field.value)
          ? validate(field.value)
          : 'Username will be shown on leaderboards for other users, \
        email and password will never be shown to others'
      }
    />
  );
}
