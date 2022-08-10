import React, { SetStateAction, useEffect, useState } from "react";
import { Typography } from "@mui/material";

import { LoadingButton } from "components/interactive";
import { EmailField, PasswordField } from "components/interactive";
import { Link } from "components/interactive/Link";
import { FormProvider, useForm } from "components/providers";
import { PageHeader } from "components/typography";
import { signIn } from "services/firebase/auth";

import { ProfileCard } from "./ProfileCard";

type props = {
  setCreatingUser: React.Dispatch<SetStateAction<boolean>>;
};

export function SignIn({ setCreatingUser }: props) {
  return (
    <ProfileCard
      header={<PageHeader header="Sign in" />}
      footer={
        <>
          <Typography>Don&apos;t have a user yet?</Typography>
          <Link onClick={() => setCreatingUser(true)}>Create User</Link>
        </>
      }
    >
      <FormProvider>
        <SignInFormFields />
      </FormProvider>
    </ProfileCard>
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
      <PasswordField field={fields.password} onChange={onFieldChange} />
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
