import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

import { LoadingButton } from "components/interactive";
import { PageHeader } from "components/typography";
import { signOut } from "services/firebase/auth";

import { ProfileCard } from "./ProfileCard";

type props = {
  username: string;
};
export function SignedIn({ username }: props) {
  const navigate = useNavigate();

  return (
    <ProfileCard
      header={
        <>
          <PageHeader header={username} />
          <Typography textAlign="start" paddingTop="16px">
            All games you play will be linked to this user, if you no longer
            want to save your games just sign out.
          </Typography>
        </>
      }
    >
      <LoadingButton
        color="error"
        onClick={async () => {
          await signOut();
          navigate("/");
        }}
        label="Sign Out"
        loadingLabel="Signing Out"
      />
    </ProfileCard>
  );
}
