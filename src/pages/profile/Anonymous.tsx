import { Stack, Typography } from '@mui/material';
import { Link, LoadingButton } from 'components/interactive';
import { FormProvider, useAuth } from 'components/providers';
import { PageHeader } from 'components/typography';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInAnonymously } from 'services/firebase/auth';
import { ProfileCard } from './components/ProfileCard';

export function Anonymous() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isSignedIn) navigate('/profile');
  }, [user]);

  if (user.isSignedIn) {
    return <PageHeader header='Create User' />;
  }

  return (
    <>
      <PageHeader header='Anonymous Sign In' />
      <ProfileCard
        header={
          <Typography textAlign='start' paddingTop='16px'>
            By signing in anonymously you don&apos;t have to provide any private
            details. You will be able to see and save your personal stats and
            best games. However, anonymous users will not appear on
            leaderboards, and their data will be deleted after 30 days.
          </Typography>
        }
        footer={
          <Stack spacing={1} justifyContent='center'>
            <Typography>
              Want to create a user instead?{' '}
              <Link onClick={() => navigate('/profile/create')}>
                Create User
              </Link>
            </Typography>
            <Typography>
              Already have a user?{' '}
              <Link onClick={() => navigate('/profile/sign-in')}>Sign In</Link>
            </Typography>
          </Stack>
        }
      >
        <FormProvider>
          <AnonymousFormFields />
        </FormProvider>
      </ProfileCard>
    </>
  );
}

function AnonymousFormFields() {
  const [errorMessage, setError] = useState('');

  const onSubmit = async () => {
    try {
      await signInAnonymously();
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <>
      <LoadingButton
        onClick={onSubmit}
        label='Sign in anonymously'
        loadingLabel='Signing in'
      />
      {errorMessage && (
        <Typography color='error' textAlign='center'>
          {errorMessage}
        </Typography>
      )}
    </>
  );
}
