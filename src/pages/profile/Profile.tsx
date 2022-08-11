import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

import { LoadingButton } from "components/interactive";
import { useAuth } from "components/providers";
import { PageHeader } from "components/typography";
import { signOut } from "services/firebase/auth";

import { ProfileCard } from "./components/ProfileCard";

export function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isSignedIn) navigate("/profile/sign-in");
  }, [user]);

  if (!user || !user.username) {
    return <PageHeader header="Profile" />;
  }

  return (
    <>
      <PageHeader header={user.username} />
      <ProfileCard
        header={
          <Typography paddingTop="16px">
            All games you play will be linked to this user, if you no longer
            want to save your games just sign out. You will still be able to
            play the games and see the leaderboard, but you won&apos;t appear on
            them, even if you beat the record.
          </Typography>
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
    </>
  );
}
