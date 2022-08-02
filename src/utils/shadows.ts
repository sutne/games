import { Theme } from "@mui/material";

export function getNeumorphicShadow(
  theme: Theme,
  distance: number = 5
): string {
  let light = `-${distance}px -${distance}px ${2 * distance}px ${
    theme.myShadows.neumorphic.light
  }`;
  let dark = `${distance}px ${distance}px ${2 * distance}px ${
    theme.myShadows.neumorphic.dark
  }`;
  return `${light}, ${dark}`;
}

export function getBoxShadow(theme: Theme, distance: number) {
  let pixels = `${distance}px ${distance}px ${2 * distance}px`;
  return `${pixels} ${theme.myShadows.box}`;
}
