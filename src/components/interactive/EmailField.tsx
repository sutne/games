import React from "react";
import * as Icons from "@mui/icons-material";

import { TextField } from "components/interactive";
import { useForm } from "components/providers";

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

  return (
    <TextField
      label="email"
      onChange={(value) =>
        onChange("email", {
          value: value,
          valid: validate(value) === undefined,
        })
      }
      error={showValidation && validate(field.value) ? true : false}
      helperText={showValidation && validate(field.value)}
      value={field.value}
      icon={<Icons.Email />}
    />
  );
}
