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
import { upgradeAnonymousUser } from "services/firebase/auth";

import { ProfileCard } from "./components/ProfileCard";

export function Upgrade() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isSignedIn && !user.isAnonymous) navigate("/profile");
    if (!user.isSignedIn) navigate("/profile/sign-in");
  }, [user]);

  return (
    <>
      <PageHeader header="Upgrade" />
      <ProfileCard
        header={
          <>
            <Typography textAlign="center" paddingTop="16px">
              Here you can upgrade to a non anonymous user account. This will
              keep all your personal stats and games.
            </Typography>
            <Typography textAlign="center">
              This will NOT retroactively put you on leaderboards, even if your
              personal best should be there.
            </Typography>
          </>
        }
        footer={
          <Stack direction="row" spacing={2} justifyContent="center">
            <Stack>
              <Typography>Don&apos;t want to upgrade? </Typography>
              <Link onClick={() => navigate("/profile")}>Go back</Link>
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
    const error = await upgradeAnonymousUser(
      fields.username.value,
      fields.email.value,
      fields.password.value
    );
    if (error) setError(error);
  };

  return (
    <>
      <UsernameField field={fields.username} onChange={onFieldChange} />
      <EmailField field={fields.email} onChange={onFieldChange} />
      <PasswordField
        field={fields.password}
        onChange={onFieldChange}
        onEnterPress={onSubmit}
      />
      <LoadingButton
        onClick={onSubmit}
        label="Upgrade to normal account"
        loadingLabel="Linking account"
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
