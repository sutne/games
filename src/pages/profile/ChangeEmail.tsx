import { Typography } from '@mui/material';
import {
  EmailField,
  LoadingButton,
  PasswordField,
} from 'components/interactive';
import { FormProvider, useAuth, useForm } from 'components/providers';
import { toast } from 'components/toast/toast';
import { PageHeader } from 'components/typography';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changeEmail } from 'services/firebase/auth';
import { ProfileCard } from './components/ProfileCard';

export function ChangeEmail() {
  return (
    <>
      <PageHeader header='Change Email' />
      <ProfileCard>
        <FormProvider>
          <ChangeEmailFormFields />
        </FormProvider>
      </ProfileCard>
    </>
  );
}

function ChangeEmailFormFields() {
  const navigate = useNavigate();
  const { setShowValidation } = useForm();
  const { user } = useAuth();

  const [errorMessage, setError] = useState('');
  const [fields, setFields] = useState({
    oldEmail: {
      value: user.email ?? '',
      valid: true,
    },
    oldPassword: {
      value: '',
      valid: false,
    },
    email: {
      value: '',
      valid: false,
    },
  });

  useEffect(() => {
    setShowValidation(false);
  }, []);

  useEffect(() => {
    if (!user.isSignedIn) navigate('/profile/sign-in');
    onFieldChange('oldEmail', { value: user.email ?? '', valid: true });
  }, [user]);

  const onFieldChange = (
    field: string,
    update: { value: string; valid: boolean },
  ) => {
    setFields({ ...fields, [field]: update });
  };

  const onSubmit = async () => {
    setShowValidation(true);
    for (const field of Object.values(fields)) {
      if (!field.valid) return;
    }
    const error = await changeEmail(
      fields.oldEmail.value,
      fields.email.value,
      fields.oldPassword.value,
    );
    if (error) {
      setError(error);
    } else {
      user.email = fields.email.value;
      navigate('/profile');
      toast.success('Your email has been changed!');
    }
  };

  return (
    <>
      <Typography>
        You must re-authenticate with your current email and password in order
        to update your email.
      </Typography>
      <EmailField id='oldEmail' field={fields.oldEmail} />
      <PasswordField
        id='oldPassword'
        field={fields.oldPassword}
        onChange={onFieldChange}
      />
      <Typography>Enter your new email address below</Typography>
      <EmailField id='email' field={fields.email} onChange={onFieldChange} />
      <LoadingButton
        onClick={onSubmit}
        label='Change Email'
        loadingLabel='Updating Email'
      />
      {errorMessage && (
        <Typography color='error' textAlign='center'>
          {errorMessage}
        </Typography>
      )}
    </>
  );
}
