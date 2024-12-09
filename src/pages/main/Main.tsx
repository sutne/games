import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Stack, Typography } from "@mui/material";

import { Card } from "components/cards";
import { Link } from "components/interactive";
import { useAuth } from "components/providers";
import { PageHeader } from "components/typography";
import { games } from "assets/games";

import { GameCard } from "./components/GameCard";

export function Main() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const disabledGames = games.filter((game) => !game.isAvailable);
  const enabledGames = games.filter((game) => game.isAvailable);

  return (
    <>
      <PageHeader header="sutne's Minimalistic Games" />
      {!user.isSignedIn && (
        <Box sx={{ marginBottom: "24px" }}>
          <Card>
            <Stack textAlign="center">
              <Typography>
                I highly recommend{" "}
                <Link onClick={() => navigate("/profile/sign-in")}>
                  signing in
                </Link>{" "}
                before playing.
              </Typography>
              <Typography>
                Doing this, you will get personal stats for each game.
              </Typography>
              <Typography>
                You can also{" "}
                <Link onClick={() => navigate("/profile/anonymous")}>
                  sign in anonymously
                </Link>{" "}
              </Typography>
            </Stack>
          </Card>
        </Box>
      )}
      <Grid
        container
        spacing={3}
        alignItems="stretch"
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {enabledGames.map((game) => (
          <Grid item xs={4} key={game.name}>
            <GameCard {...game} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Typography variant="h4" textAlign="center">
            More games might be added in the future!
          </Typography>
        </Grid>
        {disabledGames.map((game) => (
          <Grid item xs={4} key={game.name}>
            <GameCard {...game} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
