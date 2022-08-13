import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

interface props<T> {
  pixels: T[][];
  PixelComponent: (val: T) => JSX.Element;
  maxPixelSize: number;
  noZIndex?: boolean;
}
export function Display<T>({
  pixels,
  maxPixelSize,
  PixelComponent,
  noZIndex,
}: props<T>) {
  const width = pixels[0].length;
  const height = pixels.length;

  const [pixelSize, setPixelSize] = useState(
    `min(${maxPixelSize}px, calc(90vw / ${pixels[0].length}))`
  );
  const container = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((event) => {
      const containerWidth = event[0].contentBoxSize[0].inlineSize;
      const minSize = Math.floor((containerWidth ?? 0) / width);
      setPixelSize(`${Math.min(minSize, maxPixelSize)}px`);
    });
    if (!container.current) return;
    resizeObserver.observe(container.current);
  }, [container]);

  const classes = getStyle();
  return (
    <Box sx={{ width: "100%" }} ref={container}>
      <Box component="table" sx={classes.table}>
        <Box component="tbody">
          {pixels.map((row, y) => (
            <Box component="tr" key={y} sx={classes.row}>
              {row.map((pixel, x) => (
                <Box component="td" key={y * width + x} sx={classes.pixel}>
                  {PixelComponent(pixel)}
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
        width: `calc(${pixelSize} * ${width})`,
        height: `calc(${pixelSize} * ${height})`,
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
        height: pixelSize,
        border: "0px",
        padding: "0px",
      },
      pixel: {
        maxWidth: 0,
        display: "table-cell",
        borderSpacing: "0px",
        border: "0px",
        padding: "0px",
        fontSize: `calc(0.65 * ${pixelSize})`,
        "& > *:first-child": [
          {
            position: "relative",
            height: "100%",
            width: "100%",
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
          !noZIndex && {
            zIndex: "-1",
          },
        ],
      },
    };
  }
}
