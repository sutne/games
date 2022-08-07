import React from "react";
import { Box } from "@mui/material";

import { useMinesweeper } from "../hooks/MinesweeperProvider";
import { Tile } from "./Tile";

export function Board() {
  const { game } = useMinesweeper();
  if (!game) throw new Error("Cannot render game before it is initialized");
  const classes = getStyle();
  return (
    <>
      <Box component="table" sx={classes.sweeperTable}>
        <Box component="tbody">
          {game.board.map((row, r) => (
            <Box component="tr" key={r} sx={classes.sweeperRow}>
              {row.map((tile) => (
                <Box
                  component="td"
                  key={tile.y * game.width + tile.x}
                  sx={classes.sweeperCell}
                >
                  <Tile {...tile} />
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );

  function getStyle() {
    const border = {
      width: "8px",
      radius: "24px",
      style: "solid",
    };
    return {
      sweeperTable: {
        position: "relative",
        zIndex: 0,
        marginLeft: "auto",
        marginRight: "auto",
        padding: "0px",
        boxShadow: 10,
        backgroundColor: "game.features.background",
        borderSpacing: "0px",
        borderRadius: border.radius,
        borderWidth: border.width,
        borderStyle: border.style,
        borderColor: "game.features.obstacle",
        "&::after": {
          position: "absolute",
          top: `calc(-1 * ${border.width})`,
          left: `calc(-1 * ${border.width})`,
          content: "''",
          zIndex: -1,
          boxShadow: "inset 0px 0px 5px black",
          height: `calc(100% + 2 * ${border.width})`,
          width: `calc(100% + 2 * ${border.width})`,
          borderRadius: border.radius,
          borderWidth: border.width,
          borderStyle: border.style,
          borderColor: "game.features.obstacle",
        },
      },
      sweeperRow: {
        borderSpacing: "0px",
        border: "0px",
        padding: "0px",
      },
      sweeperCell: {
        borderSpacing: "0px",
        border: "0px",
        padding: "0px",
      },
    };
  }
}
