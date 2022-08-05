import React from "react";
import { Box, Typography } from "@mui/material";

import { useGame } from "../hooks/GameProvider";
import { GameTile } from "../logic";

export function Tile(tile: GameTile) {
  const { x, y, isHidden, isMine, isFlagged, numConnectedMines } = tile;
  const [game, setGame] = useGame();

  const content = () => {
    if (isFlagged) return "🚩";
    if (game.isOver() && isMine) return "💣";
    if (isHidden) return "";
    if (isMine) return "💣";
    if (numConnectedMines !== 0) return numConnectedMines;
    return "";
  };

  function onLeftClick() {
    if (game.isOver()) return;
    if (!isHidden) return;
    if (isFlagged) return;
    const copy = game.copy();
    if (!copy.isStarted) copy.start(x, y);
    copy.reveal(x, y);
    setGame(copy);
  }

  function onRightClick(e: any) {
    e.preventDefault(); // don't show context menu
    if (game.isOver()) return;
    if (!isHidden) return;
    const copy = game.copy();
    copy.toggleFlag(x, y);
    setGame(copy);
  }

  const classes = getClasses();
  return (
    <Box sx={classes.tile} onClick={onLeftClick} onContextMenu={onRightClick}>
      <Typography sx={classes.text}>{content()}</Typography>
    </Box>
  );

  function getClasses() {
    const background = () => {
      const correctFlag = game.isOver() && isFlagged && isMine;
      if (correctFlag) return "game.colors.green";
      if (isHidden) return "game.features.obstacle";
      if (isMine) return "game.colors.red";
      return "game.features.background";
    };
    const numberColor = () => {
      if (numConnectedMines === 8) return "game.colors.black";
      if (numConnectedMines === 7) return "game.colors.gray";
      if (numConnectedMines === 6) return "game.colors.brown";
      if (numConnectedMines === 5) return "game.colors.red";
      if (numConnectedMines === 4) return "game.colors.orange";
      if (numConnectedMines === 3) return "game.colors.yellow";
      if (numConnectedMines === 2) return "game.colors.green";
      if (numConnectedMines === 1) return "game.colors.blue";
      return "text.primary";
    };
    const maxSize = "52px";
    const minSize = `calc(70vw / ${game.width})`;
    return {
      tile: [
        {
          height: `min(${maxSize}, ${minSize})`,
          width: `min(${maxSize}, ${minSize})`,
          position: "relative",
          backgroundColor: background(),
          cursor: "default",
          /* Center content*/
          flex: "1px",
          display: "flex",
          textAlign: "center",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          /* Disable highlighting of the numbers */
          WebkitTouchCallout: "none",
          WebkitUserSelect: "none",
          KhtmlUserSelect: "none",
          MozUserSelect: "none",
          MsUserSelect: "none",
          userSelect: "none",
        },
        !isHidden && {
          zIndex: "-2",
        },
        isHidden && {
          "&:before": {
            position: "absolute",
            height: "100%",
            width: "100%",
            top: "0px",
            left: "0px",
            content: "''",
            zIndex: "-1",
            boxShadow: "0px 0px 5px 0px black",
          },
        },
        isHidden &&
          !game.isOver() && {
            cursor: "pointer",
            "&:hover": {
              boxShadow: "inset 0 0 5px black",
            },
          },
      ],
      text: {
        fontWeight: "bold",
        fontSize: {
          xs: "10pt",
          sm: "16pt",
          md: "22pt",
          lg: "26pt",
          xl: "30pt",
        },
        color: numberColor(),
      },
    } as const;
  }
}
