import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography } from "@mui/material";

import {
  EmailField,
  Link,
  LoadingButton,
  PasswordField,
  UsernameField,
} from "components/interactive";
import { FormProvider, useAuth, useForm } from "components/providers";
import { PageHeader } from "components/typography";
import { createUser } from "services/firebase/auth";

import { ProfileCard } from "./components/ProfileCard";

export function CreateUser() {
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
      <PageHeader header="Create User" />
      <ProfileCard
        header={
          <Typography textAlign="start" paddingTop="16px">
            Create a user for your played games to be saved, gain access to a
            detailed stats page for all game types, and appear on global
            leaderboards (if you manage to beat the other players).
          </Typography>
        }
        footer={
          <Stack direction="row" spacing={2} justifyContent="center">
            <Stack>
              <Typography>Already have a user? </Typography>
              <Link onClick={() => navigate("/profile/sign-in")}>Sign In</Link>
            </Stack>
            <Stack>
              <Typography>
                Don&apos;t want to give any personal info?
              </Typography>
              <Link onClick={() => navigate("/profile/anonymous")}>
                Sign In Anonymously
              </Link>
            </Stack>
          </Stack>
        }
      >
        <FormProvider>
          <CreateUserFormFields />
        </FormProvider>
      </ProfileCard>
    </>
  );
}

function CreateUserFormFields() {
  const { setShowValidation } = useForm();
  const [errorMessage, setError] = useState("");

  useEffect(() => {
    setShowValidation(false);
  }, []);

  const [fields, setFields] = useState({
    email: {
      value: "",
      valid: false,
    },
    password: {
      value: "",
      valid: false,
    },
    username: {
      value: "",
      valid: false,
    },
  });

  const onFieldChange = (
    field: string,
    update: { value: string; valid: boolean }
  ) => {
    setFields({ ...fields, [field]: update });
  };

  const onSubmit = async () => {
    setShowValidation(true);
    for (const field of Object.values(fields)) {
      if (!field.valid) return;
    }
    try {
      await createUser(
        fields.username.value,
        fields.email.value,
        fields.password.value
      );
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <>
      <UsernameField field={fields.username} onChange={onFieldChange} />
      <EmailField id="email" field={fields.email} onChange={onFieldChange} />
      <PasswordField
        id="password"
        field={fields.password}
        onChange={onFieldChange}
        onEnterPress={onSubmit}
      />
      <LoadingButton
        onClick={onSubmit}
        label="Create User"
        loadingLabel="Creating User"
      />
      {errorMessage && (
        <Typography color="error" textAlign="center">
          {errorMessage}
        </Typography>
      )}
    </>
  );
}
