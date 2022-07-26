import { Box, Grid, Typography } from "@material-ui/core";

import { games } from "../games";
import { GameCard } from "./components/GameCard";

export function Main() {
  return (
    <>
      <Box sx={{ marginY: "64px", marginX: "32px" }}>
        <Typography variant="h1" align="center">
          Hello there
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Want to enjoy some minamilistic games without any ads or distractions,
          then you have come to the right place!
        </Typography>
      </Box>
      <Box sx={{ marginX: "64px" }}>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          {games.map((game) => (
            <Grid item>{GameCard(game)}</Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
