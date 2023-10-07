import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

import {
  EmailField,
  LoadingButton,
  PasswordField,
} from "components/interactive";
import { FormProvider, useAuth, useForm } from "components/providers";
import { toast } from "components/toast/toast";
import { PageHeader } from "components/typography";
import { deleteAccount } from "services/firebase/auth";

import { ProfileCard } from "./components/ProfileCard";

export function DeleteAccount() {
  return (
    <>
      <PageHeader header="Delete Account" />
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

  const [errorMessage, setError] = useState("");
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

  useEffect(() => {
    setShowValidation(false);
  }, []);

  const onFieldChange = (
    field: string,
    update: { value: string; valid: boolean }
  ) => {
    setFields({ ...fields, [field]: update });
  };

  const onSubmit = async () => {
    if (!user || !user.email) return;
    setShowValidation(true);
    for (const field of Object.values(fields)) {
      if (!field.valid) return;
    }
    if (fields.email.value !== user.email) {
      setError("You must enter your current email address.");
    }
    if (
      !window.confirm(
        "Are you sure you want to delete your account?\nThis action cannot be undone!"
      )
    ) {
      return;
    }
    try {
      await deleteAccount(user.email, fields.password.value);
      navigate("/");
      toast.success("Your account was successfully deleted!");
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <>
      <Typography>
        You must re-authenticate with your current email and password in order
        to delete your account.
      </Typography>
      <EmailField id="email" field={fields.email} onChange={onFieldChange} />
      <PasswordField
        id="password"
        field={fields.password}
        onChange={onFieldChange}
      />
      <LoadingButton
        color="error"
        onClick={onSubmit}
        label="Delete Account"
        loadingLabel="Deleting all your data"
      />
      {errorMessage && (
        <Typography color="error" textAlign="center">
          {errorMessage}
        </Typography>
      )}
    </>
  );
}
