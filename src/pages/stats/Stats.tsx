import React from "react";
import { Box } from "@mui/material";

import { useAuth } from "components/providers";
import { PageHeader, SignInPrompt } from "components/typography";

import { MinesweeperStats } from "./components/MinesweeperStats";

export function Stats() {
  const { user } = useAuth();

  if (!user.isSignedIn) {
    return (
      <Box textAlign="center">
        <PageHeader header="Stats" />
        <SignInPrompt pre="To save/view your stats you have to" />
      </Box>
    );
  }

  return (
    <>
      <PageHeader header="Stats" />
      <MinesweeperStats />
    </>
  );
}
