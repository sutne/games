import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography } from "@mui/material";

import { Button, EmailField, LoadingButton } from "components/interactive";
import { FormProvider, useAuth } from "components/providers";
import { PageHeader } from "components/typography";
import { signOut } from "services/firebase/auth";

import { ProfileCard } from "./components/ProfileCard";

export function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isSignedIn) navigate("/profile/sign-in");
  }, [user]);

  if (!user) {
    return <PageHeader header="Profile" />;
  }

  return (
    <>
      <PageHeader header={user.username ?? "Anonymous"} />
      <ProfileCard
        header={
          <Stack paddingTop="16px">
            {user.isAnonymous ? (
              <>
                <Typography style={{ marginBottom: "8px" }}>
                  You have signed in anonymously.
                </Typography>
                <Typography>
                  This means that once you sign out you will no longer be able
                  to access the games/stats of this account.
                </Typography>
                <Typography>
                  If you want to convert your anonymous account to a proper user
                  you can do that below, this will keep all your current stats.
                </Typography>
              </>
            ) : (
              <>
                <Typography>
                  All games you play will be linked to this account, if you no
                  longer want to save your games just sign out. You will still
                  be able to play the games and see the leaderboard, but you
                  won&apos;t appear on them, even if you beat the record.
                </Typography>
              </>
            )}
          </Stack>
        }
      >
        <>
          {user.isAnonymous ? (
            <Button
              label="Upgrade to proper user"
              onClick={() => navigate("/profile/upgrade")}
            />
          ) : (
            <FormProvider>
              <EmailField
                id="email"
                field={{ value: user.email ?? "...", valid: true }}
              />
              <Button
                onClick={() => navigate("/profile/change-email")}
                label="Change Email"
              />
              <Button
                onClick={() => navigate("/profile/change-password")}
                label="Change Password"
              />
            </FormProvider>
          )}
          <LoadingButton
            color="error"
            onClick={async () => {
              await signOut();
              navigate("/");
            }}
            label="Sign Out"
            loadingLabel="Signing Out"
          />
          <LoadingButton
            color="error"
            onClick={() => navigate("/profile/delete")}
            label="Delete Account"
            loadingLabel="Deleting Account"
          />
        </>
      </ProfileCard>
    </>
  );
}
