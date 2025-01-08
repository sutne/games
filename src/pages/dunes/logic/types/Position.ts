import type { Velocity } from './Velocity';

export class Position {
  // actual (float) position
  readonly x: number;
  readonly y: number;

  // integer position
  readonly int_x: number;
  readonly int_y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.int_x = Math.floor(x);
    this.int_y = Math.floor(y);
  }

  offset(x: number, y: number): Position {
    return new Position(this.x + x, this.y + y);
  }

  move(velocity: Velocity): Position {
    return new Position(this.x + velocity.dx, this.y + velocity.dy);
  }

  distance(other: Position): number {
    return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
  }

  copy(): Position {
    return new Position(this.x, this.y);
  }

  equals(other: Position): boolean {
    return this.int_x === other.int_x && this.int_y === other.int_y;
  }

  toString() {
    return `Pos(${this.x.toFixed(2)},${this.y.toFixed(2)})`;
  }
}
