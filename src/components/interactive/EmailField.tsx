import React from "react";
import * as Icons from "@mui/icons-material";

import { TextField } from "components/interactive";
import { useForm } from "components/providers";

type props = {
  id: string;
  field: { value: string; valid: boolean };
  onChange?: (field: string, update: { value: string; valid: boolean }) => void;
};

export function EmailField({ id, field, onChange }: props) {
  const { showValidation } = useForm();

  const validate = (email: string) => {
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))
      return "Invalid email address";
  };

  return (
    <TextField
      disabled={onChange === undefined}
      label={"email"}
      onChange={(value) =>
        onChange?.(id, {
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
