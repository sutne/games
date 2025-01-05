import { Position } from '../types/Position';

/** return positions in order along the shortest path, excluding `from` */
export function getPath(from: Position, to: Position): Position[] {
  if (to.equals(from)) return [];
  const path: Position[] = [];
  const xDistance = to.int_x - from.int_x;
  const yDistance = to.int_y - from.int_y;
  const pathLength = Math.abs(xDistance) + Math.abs(yDistance);
  const xStep = xDistance / pathLength;
  const yStep = yDistance / pathLength;
  for (let i = 0; i <= pathLength; i++) {
    const pos = new Position(from.x + i * xStep, from.y + i * yStep);
    if (pos.equals(from)) continue; // skip the from position
    path.push(pos);
  }
  return path;
}
