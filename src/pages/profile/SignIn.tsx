import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

import { LoadingButton } from "components/interactive";
import { EmailField, PasswordField } from "components/interactive";
import { Link } from "components/interactive/Link";
import { FormProvider, useAuth, useForm } from "components/providers";
import { PageHeader } from "components/typography";
import { signIn } from "services/firebase/auth";

import { ProfileCard } from "./components/ProfileCard";

export function SignIn() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isSignedIn) navigate("/profile");
  }, [user]);

  if (user.isSignedIn) {
    return <PageHeader header="Sign In" />;
  }

  return (
    <>
      <PageHeader header="Sign In" />
      <ProfileCard
        footer={
          <>
            <Typography>Don&apos;t have a user yet?</Typography>
            <Link onClick={() => navigate("/profile/create-user")}>
              Create User
            </Link>
          </>
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
    const error = await signIn(fields.email.value, fields.password.value);
    if (error) setError(error);
  };

  return (
    <>
      <EmailField field={fields.email} onChange={onFieldChange} />
      <PasswordField
        field={fields.password}
        onChange={onFieldChange}
        onEnterPress={onSubmit}
      />
      <LoadingButton
        onClick={onSubmit}
        label="Sign In"
        loadingLabel="Signing In"
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
