import React from "react";
import { Box, Theme, Typography } from "@mui/material";

import { Link } from "components/Link";
import { Game } from "games";

export function GameCard(game: Game) {
  return game.isAvailable ? (
    <GameCardUnavailable {...game} />
  ) : (
    <GameCardAvailable {...game} />
  );
}

function GameCardAvailable({ name, image, description }: Game) {
  const classes = getStyle({ available: true });
  return (
    <Link to={`/${name}`}>
      <Box sx={classes.gameCard}>
        <Box sx={classes.imageBox}>
          <Box component="img" src={image} alt={name} />
        </Box>
        <Box sx={classes.textBox}>
          <Typography variant="h5">{name}</Typography>
          <Typography variant="body1" sx={classes.description}>
            {description}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
}

function GameCardUnavailable({ name, image }: Game) {
  const classes = getStyle({ available: false });
  return (
    <Box sx={classes.gameCard}>
      <Box sx={classes.imageBox}>
        <Box component="img" src={image} alt={name} />
      </Box>
      <Box sx={classes.textBox}>
        <Typography variant="h5">{name}</Typography>
      </Box>
    </Box>
  );
}

//------------------------------------------------------------------------------

type StyleProps = {
  available: boolean;
};
function getStyle({ available }: StyleProps) {
  return {
    gameCard: [
      {
        borderRadius: "16px",
        overflow: "hidden",
        transform: "scale(1)",
        transition: "transform ease 0.3s",
        img: {
          height: "170%",
          width: "110%",
          transform: "rotate(-17deg) translate(-8px, -55px)",
          objectFit: "cover",
        },
      },
      available && {
        backgroundColor: "background.paper",
        boxShadow: 5,
        cursor: "pointer",
        "&:hover": {
          boxShadow: 15,
          transform: "translate(0px, -5px) scale(1.01)",
        },
      },
      !available && {
        backgroundColor: "background.disabled",
        boxShadow: 1,
        cursor: "default",
        img: {
          filter: "grayscale(1) blur(2px)",
        },
      },
    ],
    imageBox: {
      height: "150px",
      overflow: "hidden",
      position: "relative",
      ":after": {
        position: "absolute",
        content: "''",
        left: "0px",
        top: "0px",
        height: "100%",
        width: "100%",
        background: (theme: Theme) =>
          `linear-gradient(to bottom, rgba(0, 0, 0, 0) 90%, 
          ${
            available
              ? theme.palette.background.paper
              : theme.palette.background.disabled
          } 100%)`,
      },
    },
    textBox: {
      padding: "0px 24px 12px 24px",
    },
    description: {
      paddingTop: "12px",
    },
  } as const;
}
