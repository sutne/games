import React, { SetStateAction, useEffect, useState } from "react";
import { Typography } from "@mui/material";

import {
  EmailField,
  Link,
  LoadingButton,
  PasswordField,
  UsernameField,
} from "components/interactive";
import { FormProvider, useForm } from "components/providers";
import { PageHeader } from "components/typography";
import { createUser } from "services/firebase/auth";

import { ProfileCard } from "./ProfileCard";

type props = {
  setCreatingUser: React.Dispatch<SetStateAction<boolean>>;
};
export function CreateUser({ setCreatingUser }: props) {
  return (
    <ProfileCard
      header={
        <>
          <PageHeader header="Create User" />
          <Typography textAlign="start" paddingTop="16px">
            Create a user for your played games to be saved, gain access to a
            detailed stats page for all game types, and appear on global
            leaderboards (if you manage to beat the other players).
          </Typography>
        </>
      }
      footer={
        <>
          <Typography>Already have a user? </Typography>
          <Link onClick={() => setCreatingUser(false)}>Sign In</Link>
        </>
      }
    >
      <FormProvider>
        <CreateUserFormFields />
      </FormProvider>
    </ProfileCard>
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
    const error = await createUser(
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
        label="Create User"
        loadingLabel="Creating User"
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
