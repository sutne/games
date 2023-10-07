import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

import {
  EmailField,
  LoadingButton,
  PasswordField,
} from "components/interactive";
import { FormProvider, useAuth, useForm } from "components/providers";
import { PageHeader } from "components/typography";
import { changePassword } from "services/firebase/auth";

import { toast } from "../../components/toast/toast";
import { ProfileCard } from "./components/ProfileCard";

export function ChangePassword() {
  return (
    <>
      <PageHeader header="Change Password" />
      <ProfileCard>
        <FormProvider>
          <UpdateUserFormFields />
        </FormProvider>
      </ProfileCard>
    </>
  );
}

function UpdateUserFormFields() {
  const { setShowValidation } = useForm();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setError] = useState("");

  useEffect(() => {
    setShowValidation(false);
  }, []);

  if (!user.email) return <></>;

  const [fields, setFields] = useState({
    oldEmail: {
      value: user.email,
      valid: true,
    },
    oldPassword: {
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
    try {
      await changePassword(
        fields.oldEmail.value,
        fields.oldPassword.value,
        fields.password.value
      );
      navigate("/profile");
      toast.success("Password updated successfully!");
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <>
      <Typography>
        You must re-authenticate with your current email and password in order
        to update your password.
      </Typography>
      <EmailField id="oldEmail" field={fields.oldEmail} />
      <PasswordField
        id="oldPassword"
        field={fields.oldPassword}
        onChange={onFieldChange}
      />
      <Typography>Enter your new password below</Typography>
      <PasswordField
        id="password"
        field={fields.password}
        onChange={onFieldChange}
      />
      <LoadingButton
        onClick={onSubmit}
        label="Change Password"
        loadingLabel="Updating Password"
      />
      {errorMessage && (
        <Typography color="error" textAlign="center">
          {errorMessage}
        </Typography>
      )}
    </>
  );
}
