import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";

import { useTheme } from "pages/hooks/ThemeProvider";

type props = {
  label: string;
  onClick: () => void;
  loadingLabel?: string;
  color?:
    | "error"
    | "primary"
    | "inherit"
    | "secondary"
    | "success"
    | "info"
    | "warning"
    | undefined;
};
export function LoadingButton({ color, onClick, label, loadingLabel }: props) {
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const handleClick = async () => {
    setLoading(true);
    await onClick();
    setLoading(false);
  };

  return (
    <Button
      variant="outlined"
      color={color}
      onClick={handleClick}
      startIcon={
        loading ? (
          <CircularProgress
            size={theme.typography.htmlFontSize}
            color={color}
          />
        ) : (
          <></>
        )
      }
    >
      {loading ? loadingLabel ?? label : label}
    </Button>
  );
}
