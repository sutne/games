import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";

import { useAuth } from "pages/hooks/AuthProvider";
import { signOut } from "services/firebase/auth";

import { LoadingButton } from "./components/LoadingButton";
import { profileClasses } from ".";

export function SignedIn() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const classes = profileClasses();
  return (
    <>
      <Box sx={classes.header}>
        <Typography variant="h4">{user.username}</Typography>
        <Typography textAlign="start" paddingTop="16px">
          All games you play will be linked to this user, if you no longer want
          to save your games just sign out.
        </Typography>
      </Box>
      <Stack spacing={1}>
        <LoadingButton
          color="error"
          onClick={async () => {
            await signOut();
            navigate("/");
          }}
          label="Sign Out"
          loadingLabel="Signing Out"
        />
      </Stack>
    </>
  );
}
