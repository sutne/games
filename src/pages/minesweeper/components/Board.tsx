import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

import { Cell } from "./Cell";
import { useGame } from "./GameProvider";

export function Board() {
  const { game } = useGame();
  const [tileSize, setTileSize] = useState(
    `min(64px, calc(90vw / ${game.width}))`
  );
  const container = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((event) => {
      const containerWidth = event[0].contentBoxSize[0].inlineSize;
      const maxSize = 64;
      const minSize = Math.floor((containerWidth ?? 80) / (game?.width ?? 1));
      setTileSize(`${Math.min(minSize, maxSize)}px`);
    });
    if (!container.current) return;
    resizeObserver.observe(container.current);
  }, [container]);

  const classes = getStyle();
  return (
    <Box sx={{ width: "100%" }} ref={container}>
      <Box component="table" sx={classes.table}>
        <Box component="tbody">
          {game.board.map((row, r) => (
            <Box component="tr" key={r} sx={classes.row}>
              {row.map((tile) => (
                <Box
                  component="td"
                  key={game._getIndex(tile.x, tile.y)}
                  sx={classes.cell}
                >
                  <Cell {...tile} />
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );

  function getStyle() {
    const border = {
      width: "8px",
      radius: "24px",
      style: "solid",
    };

    return {
      table: {
        width: `calc(${tileSize} * ${game?.width})`,
        height: `calc(${tileSize} * ${game?.height})`,
        tableLayout: "fixed",
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
      row: {
        borderSpacing: "0px",
        height: tileSize,
        border: "0px",
        padding: "0px",
      },
      cell: {
        maxWidth: 0,
        display: "table-cell",
        borderSpacing: "0px",
        border: "0px",
        padding: "0px",
        fontSize: `calc(0.65 * ${tileSize})`,
      },
    };
  }
}
