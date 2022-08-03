import { Box, Grid, Typography } from "@mui/material";

import { games } from "../../games";
import { GameCard } from "./components/GameCard";

export function Main() {
  const disabledGames = games.filter((game) => game.isAvailable);
  const enabledGames = games.filter((game) => !game.isAvailable);
  const classes = getStyle();
  return (
    <Box sx={classes.main}>
      <Box sx={classes.header}>
        <Typography variant="h2">Games</Typography>
        <Typography variant="body1">
          Want to enjoy some minimalistic games without any ads or distractions,
          then you have come to the right place!
        </Typography>
      </Box>

      <Box sx={classes.grid}>
        <Grid
          container
          spacing={3}
          alignItems="stretch"
          columns={{ xs: 6, sm: 12, md: 12 }}
        >
          <Grid item xs={12}>
            <Typography variant="h4">Available Games</Typography>
          </Grid>
          {enabledGames.map((game) => (
            <Grid item xs={6} key={game.name}>
              <GameCard {...game} />
            </Grid>
          ))}
          <Grid item xs={12}>
            {" "}
            <Typography variant="h4">Under Construction</Typography>
          </Grid>
          {disabledGames.map((game) => (
            <Grid item xs={6} key={game.name}>
              <GameCard {...game} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

//------------------------------------------------------------------------------

function getStyle() {
  return {
    main: {},
    grid: {
      width: "min(85vw, 700px)",
      margin: "0 auto",
    },
    header: {
      textAlign: "center",
    },
  };
}
