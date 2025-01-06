import { Air } from '../elements/Air';
import { Solid } from '../elements/Solid';
import type { DunesElement } from '../types/DunesElement';
import { Position } from '../types/Position';

export function initializeElements(
  width: number,
  height: number,
): DunesElement[][] {
  const array: DunesElement[][] = [];
  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      const pos = new Position(x, y);
      row.push(new Air(pos));
    }
    array.push(row);
  }

  // add solid walls
  const thickness = Math.floor(Math.max(1, Math.min(width, height) * 0.03));
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const isTop = y < thickness;
      const isBottom = y >= height - thickness;
      const isLeft = x < thickness;
      const isRight = x >= width - thickness;
      if (isTop || isBottom || isRight || isLeft) {
        const pos = new Position(x, y);
        array[y][x] = new Solid(pos);
      }
    }
  }

  return array;
}
