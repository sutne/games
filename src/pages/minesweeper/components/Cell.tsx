import React from "react";
import { Box } from "@mui/material";

import { Cell as GameCell } from "../logic/cell";
import { useGame } from "./GameProvider";

export function Cell(cell: GameCell) {
  const { x, y, numConnectedMines, isMine, isHidden, isFlagged } = cell;
  const { game, updateGame } = useGame();

  const content = () => {
    if (isFlagged) return "🚩";
    if (game.isOver() && isMine) return "💣";
    if (isHidden) return "";
    if (isMine) return "💣";
    if (numConnectedMines !== 0) return numConnectedMines;
    return "";
  };

  const onLeftClick = () => {
    if (!isHidden) return;
    if (game.isOver()) return;
    if (isFlagged) return;
    updateGame((prev) => {
      if (!prev.isStarted) prev.start(x, y);
      prev.reveal(x, y);
    });
  };

  const onRightClick = (e: any) => {
    e.preventDefault(); // don't show context menu
    if (!isHidden) return;
    if (game.isOver()) return;
    updateGame((prev) => prev.toggleFlag(x, y));
  };

  const classes = getClasses();
  return (
    <Box sx={classes.cell} onClick={onLeftClick} onContextMenu={onRightClick}>
      <Box sx={classes.text}>{content()}</Box>
    </Box>
  );

  function getClasses() {
    const background = () => {
      const correctFlag = game.isOver() && isFlagged && isMine;
      if (correctFlag) return "game.colors.green";
      if (isHidden) return "game.features.obstacle";
      if (isMine)
        return game.isWon ? "game.features.obstacle" : "game.colors.red";
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
    return {
      cell: [
        {
          height: "100%",
          width: "100%",
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
        color: numberColor(),
      },
    } as const;
  }
}
