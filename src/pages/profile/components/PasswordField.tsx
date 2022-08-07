import React, { useState } from "react";
import * as Icons from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";

import { useForm } from "../hooks/FormProvider";

type props = {
  field: { value: string; valid: boolean };
  onChange: (field: string, update: { value: string; valid: boolean }) => void;
};

export function PasswordField({ field, onChange }: props) {
  const { showValidation } = useForm();
  const [hidden, setHidden] = useState(false);

  const validate = (password: string) => {
    if (password.length < 6)
      return "Password must be at least 6 characters long";
  };

  const onUpdate = (e: any) => {
    onChange("password", {
      value: e.target.value,
      valid: validate(e.target.value) === undefined,
    });
  };

  return (
    <TextField
      variant="outlined"
      error={showValidation && validate(field.value) ? true : false}
      helperText={showValidation && validate(field.value)}
      typeof="email"
      placeholder="password"
      autoComplete="password"
      type={hidden ? "text" : "password"}
      value={field.value}
      onChange={onUpdate}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Icons.Key />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setHidden((hidden) => !hidden)}
              onMouseDown={(e) => e.preventDefault()}
              edge="end"
            >
              {hidden ? <Icons.VisibilityOff /> : <Icons.Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
