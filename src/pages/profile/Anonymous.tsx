import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography } from "@mui/material";

import { Link, LoadingButton } from "components/interactive";
import { FormProvider, useAuth } from "components/providers";
import { PageHeader } from "components/typography";
import { signInAnonymously } from "services/firebase/auth";

import { ProfileCard } from "./components/ProfileCard";

export function Anonymous() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isSignedIn) navigate("/profile");
  }, [user]);

  if (user.isSignedIn) {
    return <PageHeader header="Create User" />;
  }

  return (
    <>
      <PageHeader header="Anonymous Sign In" />
      <ProfileCard
        header={
          <Typography textAlign="start" paddingTop="16px">
            By signing in anonymously you don&apos;t have to provide any private
            details. You will be able to see and save your personal stats and
            best games. However, anonymous users will not appear on
            leaderboards, and their data will be deleted after 30 days.
          </Typography>
        }
        footer={
          <Stack direction="row" spacing={2} justifyContent="center">
            <Stack>
              <Typography>Want to create a user instead? </Typography>
              <Link onClick={() => navigate("/profile/create-user")}>
                Create User
              </Link>
            </Stack>
            <Stack>
              <Typography>Already have a user? </Typography>
              <Link onClick={() => navigate("/profile/sign-in")}>Sign In</Link>
            </Stack>
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
  const [errorMessage, setError] = useState("");

  const onSubmit = async () => {
    const error = await signInAnonymously();
    if (error) setError(error);
  };

  return (
    <>
      <LoadingButton
        onClick={onSubmit}
        label="Sign in anonymously"
        loadingLabel="Signing in"
      />
      {errorMessage ? (
        <Typography color="error" textAlign="center">
          {errorMessage}
        </Typography>
      ) : (
        <></>
      )}
    </>
  );
}
