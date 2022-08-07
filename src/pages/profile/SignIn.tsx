import React, { SetStateAction, useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { signIn } from "services/firebase/auth";

import { LoadingButton } from "./components/LoadingButton";
import { FormProvider, useForm } from "./hooks/FormProvider";
import { EmailField, PasswordField } from "./components";
import { profileClasses, UserState } from ".";

type props = {
  switchState: React.Dispatch<SetStateAction<UserState>>;
};
export function SignIn({ switchState }: props) {
  const classes = profileClasses();
  return (
    <>
      <Box sx={classes.header}>
        <Typography variant="h4">Sign in</Typography>
        <Typography textAlign="start" paddingTop="16px">
          Sign in so your played games can be saved, gain access to a detailed
          stats page for all game types, and appear on global leaderboard (if
          you manage to beat the other players
        </Typography>
      </Box>
      <FormProvider>
        <Stack spacing={1}>
          <SignInFormFields />
        </Stack>
      </FormProvider>
      <Box sx={classes.footer}>
        <Typography>Don&apos;t have a user yet?</Typography>
        <Box
          sx={classes.link}
          onClick={() => switchState(UserState.CREATE_USER)}
        >
          Create User
        </Box>
      </Box>
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
