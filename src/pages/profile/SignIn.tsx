import { Stack, Typography } from '@mui/material';
import { LoadingButton } from 'components/interactive';
import { EmailField, PasswordField } from 'components/interactive';
import { Link } from 'components/interactive/Link';
import { FormProvider, useAuth, useForm } from 'components/providers';
import { toast } from 'components/toast/toast';
import { PageHeader } from 'components/typography';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendResetPasswordEmail, signIn } from 'services/firebase/auth';
import { ProfileCard } from './components/ProfileCard';

export function SignIn() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isSignedIn) navigate('/profile');
  }, [user]);

  if (user.isSignedIn) {
    return <PageHeader header='Sign In' />;
  }

  return (
    <>
      <PageHeader header='Sign In' />
      <ProfileCard
        footer={
          <Stack spacing={1} justifyContent='center'>
            <Typography>
              Don&apos;t have a user yet?{' '}
              <Link onClick={() => navigate('/profile/create')}>
                Create User
              </Link>
            </Typography>
            <Typography>
              Don&apos;t want to give any personal info?{' '}
              <Link onClick={() => navigate('/profile/anonymous')}>
                Sign In Anonymously
              </Link>
            </Typography>
          </Stack>
        }
      >
        <FormProvider>
          <SignInFormFields />
        </FormProvider>
      </ProfileCard>
    </>
  );
}

function SignInFormFields() {
  const { setShowValidation } = useForm();

  const [errorMessage, setError] = useState('');

  useEffect(() => {
    setShowValidation(false);
  }, []);

  const [fields, setFields] = useState({
    email: {
      value: '',
      valid: false,
    },
    password: {
      value: '',
      valid: false,
    },
  });

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
    try {
      await signIn(fields.email.value, fields.password.value);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  async function resetPassword() {
    try {
      await sendResetPasswordEmail(fields.email.value);
      toast.success('An email has been sent to reset your password!');
    } catch (error) {
      toast.error(
        `Failed to send password reset email!\n${(error as Error).message}`,
      );
    }
  }

  return (
    <>
      <EmailField id='email' field={fields.email} onChange={onFieldChange} />
      <PasswordField
        id='password'
        field={fields.password}
        onChange={onFieldChange}
        onEnterPress={onSubmit}
      />
      <LoadingButton
        onClick={onSubmit}
        label='Sign In'
        loadingLabel='Signing In'
      />
      {errorMessage && (
        <>
          <Typography color='error' textAlign='center'>
            {errorMessage}
          </Typography>
          <Link center onClick={resetPassword}>
            Forgot your password?
          </Link>
        </>
      )}
    </>
  );
}
