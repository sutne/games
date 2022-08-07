import React from "react";
import * as Icons from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

import { useForm } from "../hooks/FormProvider";

type props = {
  field: { value: string; valid: boolean };
  onChange: (field: string, update: { value: string; valid: boolean }) => void;
};

export function EmailField({ field, onChange }: props) {
  const { showValidation } = useForm();

  const validate = (email: string) => {
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))
      return "Invalid email address";
  };

  const onUpdate = (e: any) => {
    onChange("email", {
      value: e.target.value,
      valid: validate(e.target.value) === undefined,
    });
  };

  return (
    <TextField
      variant="outlined"
      onChange={onUpdate}
      error={showValidation && validate(field.value) ? true : false}
      helperText={showValidation && validate(field.value)}
      placeholder="email"
      autoComplete="email"
      value={field.value}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Icons.Email />
          </InputAdornment>
        ),
      }}
    />
  );
}
