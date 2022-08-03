import { Box, Grid, Typography } from "@mui/material";

import { games } from "../../games";
import { GameCard } from "./components/GameCard";

export function Main() {
  const disabledGames = games.filter((game) => game.isAvailable);
  const enabledGames = games.filter((game) => !game.isAvailable);
  const classes = getStyle();
  return (
    <>
      <Box sx={classes.header}>
        <Typography variant="h2">Games</Typography>
        <Typography variant="body1">
          Want to enjoy some minimalistic games without any ads or distractions,
          then you have come to the right place!
        </Typography>
      </Box>
      <Typography variant="h4" sx={classes.titleRow}>
        Available Games
      </Typography>
      <Grid container spacing={3} justifyContent="center" alignItems="stretch">
        {enabledGames.map((game) => (
          <Grid item key={game.name}>
            <GameCard {...game} />
          </Grid>
        ))}
      </Grid>
      <Typography variant="h4" sx={classes.titleRow}>
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

//------------------------------------------------------------------------------

function getStyle() {
  return {
    header: {
      margin: "64px",
      textAlign: "center",
    },
    titleRow: {
      textAlign: "center",
      padding: "30px 0px 10px 0px",
      spacing: 3,
    },
  };
}
