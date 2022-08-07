import React, { SetStateAction, useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { createUser } from "services/firebase/auth";

import { LoadingButton } from "./components/LoadingButton";
import { FormProvider, useForm } from "./hooks/FormProvider";
import { EmailField, PasswordField, UsernameField } from "./components";
import { profileClasses, UserState } from ".";

type props = {
  switchState: React.Dispatch<SetStateAction<UserState>>;
};
export function CreateUser({ switchState }: props) {
  const classes = profileClasses();
  return (
    <>
      <Box sx={classes.header}>
        <Typography variant="h4">Create User</Typography>
        <Typography textAlign="start" paddingTop="16px">
          Create a user for your played games to be saved, gain access to a
          detailed stats page for all game types, and appear on global
          leaderboard (if you manage to beat the other players
        </Typography>
      </Box>
      <Stack spacing={1}>
        <FormProvider>
          <CreateUserFormFields />
        </FormProvider>
      </Stack>

      <Box sx={classes.footer}>
        <Typography>Already have a user?</Typography>
        <Box sx={classes.link} onClick={() => switchState(UserState.SIGN_IN)}>
          Sign In
        </Box>
      </Box>
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
      <PasswordField field={fields.password} onChange={onFieldChange} />
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
