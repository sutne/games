import React, { useState } from "react";
import * as Icons from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { TextField } from "components/interactive";
import { useForm } from "components/providers/FormProvider";

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

  return (
    <TextField
      label="password"
      onChange={(value) => {
        onChange("password", {
          value: value,
          valid: validate(value) === undefined,
        });
      }}
      error={showValidation && validate(field.value) ? true : false}
      helperText={showValidation && validate(field.value)}
      type={hidden ? "text" : "password"}
      value={field.value}
      icon={<Icons.Key />}
      end={
        <IconButton onClick={() => setHidden((hidden) => !hidden)} edge="end">
          {hidden ? <Icons.VisibilityOff /> : <Icons.Visibility />}
        </IconButton>
      }
    />
  );
}
