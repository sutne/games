export type Position = {
  x: number;
  y: number;
};

export function distance(a: Position, b: Position): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

export function equals(a: Position, b: Position): boolean {
  return a.x === b.x && a.y === b.y;
}
