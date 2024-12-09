import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Theme, Typography } from "@mui/material";

import { useTheme } from "components/providers";
import { GameListEntry } from "assets/games";

export function GameCard({ name, image, isAvailable }: GameListEntry) {
  const { themeIsDark } = useTheme();
  const navigate = useNavigate();

  const onClick = () => {
    if (isAvailable) navigate(name);
  };

  const classes = getClasses();
  return (
    <Box sx={classes.gameCard} onClick={onClick}>
      <Box sx={classes.image}>
        <Box
          component="img"
          src={themeIsDark ? image.dark : image.light}
          alt={name}
        />
      </Box>
      <Typography sx={classes.name} variant="h5">
        {name}
      </Typography>
    </Box>
  );

  function getClasses() {
    return {
      gameCard: [
        {
          position: "relative",
          overflow: "hidden",
          aspectRatio: "1.618",
          borderRadius: "16px",
          transition: "box-shadow 0.1s ease, \
          transform 0.1s ease",
        },
        isAvailable && {
          cursor: "pointer",
          boxShadow: 5,
          ":hover": {
            boxShadow: 15,
            transform: "translate(0px, -2px) scale(1.01)",
          },
        },
        !isAvailable && {
          cursor: "default",
        },
      ],
      image: [
        {
          position: "relative",
          height: "100%",
          width: "100%",
          img: {
            height: "100%",
            width: "100%",
            objectFit: "cover",
          },
          ":after": {
            position: "absolute",
            left: 0,
            top: 0,
            content: "''",
            height: "100%",
            width: "100%",
            opacity: "0.95",
            background: (theme: Theme) =>
              `linear-gradient(to bottom, rgba(0, 0, 0, 0) 40%,
                ${theme.palette.game.features.obstacle} 95%)`,
          },
        },
        !isAvailable && {
          filter: "blur(2pt)",
        },
      ],
      name: {
        position: "absolute",
        left: "24px",
        bottom: "12px",
        fontWeight: "600",
      },
    };
  }
}
