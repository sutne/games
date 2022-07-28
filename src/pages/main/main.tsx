import { Box, Grid, Typography } from "@material-ui/core";

import "./main.css";
import { games } from "../../assets/game-list";
import { GameCard } from "./components/game-card";

export function Main() {
  return (
    <>
      <Box className="header">
        <Typography variant="h2">Games</Typography>
        <Typography variant="body1">
          Want to enjoy some minimalistic games without any ads or distractions,
          then you have come to the right place!
        </Typography>
      </Box>
      <Box className="game-grid">
        <Grid container spacing={3} justifyContent="center">
          {games.map((game) => (
            <Grid item key={game.name}>
              <GameCard {...game} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
