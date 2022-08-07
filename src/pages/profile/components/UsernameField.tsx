import React from "react";
import * as Icons from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

import { useForm } from "../hooks/FormProvider";

type props = {
  field: { value: string; valid: boolean };
  onChange: (field: string, update: { value: string; valid: boolean }) => void;
};
export function UsernameField({ field, onChange }: props) {
  const { showValidation } = useForm();

  const validate = (username: string) => {
    if (username.length < 5 || 12 < username.length)
      return "Username must be between 5 and 12 characters long";
  };

  const onUpdate = (e: any) => {
    onChange("username", {
      value: e.target.value,
      valid: validate(e.target.value) === undefined,
    });
  };

  return (
    <TextField
      error={showValidation && validate(field.value) ? true : false}
      helperText={
        showValidation && validate(field.value)
          ? validate(field.value)
          : "Username will be shown on leaderboards for other users, \
        email and password will never be shown to others"
      }
      placeholder="username"
      autoComplete="username"
      onChange={onUpdate}
      value={field.value}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Icons.Person />
          </InputAdornment>
        ),
      }}
      variant="outlined"
    />
  );
}
