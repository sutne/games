import { Box, Grid, Typography } from "@mui/material";

import "./main.css";
import { games } from "../../game-list";
import { GameCard } from "./components/game-card";

export function Main() {
  const disabledGames = games.filter((game) => game.disabled);
  const enabledGames = games.filter((game) => !game.disabled);

  return (
    <>
      <Box className="header">
        <Typography variant="h2">Games</Typography>
        <Typography variant="body1">
          Want to enjoy some minimalistic games without any ads or distractions,
          then you have come to the right place!
        </Typography>
      </Box>
      <Typography variant="h4" textAlign="center" padding="30px 0px 10px 0px">
        Available Games
      </Typography>
      <Grid container spacing={3} justifyContent="center" alignItems="stretch">
        {enabledGames.map((game) => (
          <Grid item key={game.name}>
            <GameCard {...game} />
          </Grid>
        ))}
      </Grid>
      <Typography variant="h4" textAlign="center" padding="30px 0px 10px 0px">
        Under Construction
      </Typography>
      <Grid container spacing={3} justifyContent="center" alignItems="stretch">
        {disabledGames.map((game) => (
          <Grid item key={game.name}>
            <GameCard {...game} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
