import React from "react";
import { Box } from "@mui/material";

import { useGame } from "../hooks/GameProvider";
import { GameTile } from "../logic";

export function Tile(tile: GameTile) {
  const { x, y, isHidden, isBomb, isFlagged, numConnectedBombs } = tile;
  const [game, setGame] = useGame();

  const content = () => {
    if (isFlagged) return "🚩";
    if (game.isOver() && isBomb) return "💣";
    if (isHidden) return "";
    if (isBomb) return "💣";
    if (numConnectedBombs !== 0) return numConnectedBombs;
    return "";
  };

  function onLeftClick() {
    if (!isHidden) return;
    if (game.isLost || game.isWon) return;
    if (isFlagged) return;
    const copy = game.copy();
    if (!copy.hasInitializedBombs) copy.initBombs(x, y);
    copy.reveal(x, y);
    if (isBomb) {
      copy.revealBombs();
      copy.isLost = true;
    }
    copy.checkIfWon();
    setGame(copy);
  }

  function onRightClick(e: any) {
    e.preventDefault(); // don't show context menu
    if (!isHidden) return;
    if (game.isLost || game.isWon) return;
    const copy = game.copy();
    copy.toggleFlag(x, y);
    setGame(copy);
  }

  const classes = getClasses();
  return (
    <Box sx={classes.tile} onClick={onLeftClick} onContextMenu={onRightClick}>
      {content()}
    </Box>
  );

  function getClasses() {
    const background = () => {
      const correctFlag = game.isOver() && isFlagged && isBomb;
      if (correctFlag) return "game.colors.green";
      if (isHidden) return "game.features.obstacle";
      if (isBomb) return "game.colors.red";
      return "game.features.background";
    };
    const numberColor = () => {
      if (numConnectedBombs === 8) return "game.colors.black";
      if (numConnectedBombs === 7) return "game.colors.gray";
      if (numConnectedBombs === 6) return "game.colors.brown";
      if (numConnectedBombs === 5) return "game.colors.red";
      if (numConnectedBombs === 4) return "game.colors.orange";
      if (numConnectedBombs === 3) return "game.colors.yellow";
      if (numConnectedBombs === 2) return "game.colors.green";
      if (numConnectedBombs === 1) return "game.colors.blue";
      return "text.primary";
    };
    const tileSize = "28pt";
    return {
      tile: [
        {
          position: "relative",
          fontSize: "20pt",
          fontWeight: "bold",
          height: tileSize,
          width: tileSize,
          backgroundColor: background(),
          color: numberColor(),
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
        isHidden && {
          cursor: "pointer",
          "&:hover": {
            boxShadow: "inset 0 0 5px black",
          },
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
        !isHidden && {
          zIndex: "-2",
          cursor: "default",
        },
      ],
    } as const;
  }
}
