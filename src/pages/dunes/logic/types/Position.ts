import { Velocity } from "./Velocity";

export class Position {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = Math.floor(x);
    this.y = Math.floor(y);
  }

  add(velocity: Velocity): Position {
    return new Position(this.x + velocity.dx, this.y + velocity.dy);
  }

  offset(x: number, y: number): Position {
    return new Position(this.x + x, this.y + y);
  }

  distance(other: Position): number {
    return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
  }

  copy(): Position {
    return new Position(this.x, this.y);
  }

  equals(other: Position): boolean {
    return this.x === other.x && this.y === other.y;
  }
}
