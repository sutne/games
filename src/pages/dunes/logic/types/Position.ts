import type { Velocity } from './Velocity';

export enum Direction {
  UP = 0,
  DOWN = 1,
  LEFT = 2,
  RIGHT = 3,
  DOWN_LEFT = 4,
  DOWN_RIGHT = 5,
}

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

  _offset(x: number, y: number): Position {
    return new Position(this.x + x, this.y + y);
  }

  offset(direction: Direction): Position {
    switch (direction) {
      case Direction.UP:
        return this._offset(0, -1);
      case Direction.DOWN:
        return this._offset(0, 1);
      case Direction.LEFT:
        return this._offset(-1, 0);
      case Direction.RIGHT:
        return this._offset(1, 0);
      case Direction.DOWN_LEFT:
        return this._offset(-1, 1);
      case Direction.DOWN_RIGHT:
        return this._offset(1, 1);
    }
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
