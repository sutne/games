import { Painter } from "../Painter";
import { Position } from "../types/Position";
import { Velocity } from "../types/Velocity";
import { World } from "../World";
import { DunesElement } from "./DunesElement";

const colors: string[] = [
  "rgb(255,203,141)",
  "rgb(255,216,160)",
  "rgb(227,168,110)",
  "rgb(208,163,124)",
  "rgb(255,202,138)",
  "rgb(232,170,111)",
];

export class Sand implements DunesElement {
  isUpdated = false;
  velocity: Velocity;
  color: string;

  constructor(velocity: Velocity) {
    this.velocity = { dx: 0, dy: 1 };
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  draw(position: Position, painter: Painter): void {
    painter.drawPixel(position.x, position.y, this.color);
  }

  random(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  update(position: Position, world: World, delta: number): void {
    // Update vectors
    // if (0 < this.velocity.dx && !world.isAvailable(position.offset(1, 0))) {
    //   this.velocity.dx = 0;
    // }
    // if (this.velocity.dx < 0 && !world.isAvailable(position.offset(-1, 0))) {
    //   this.velocity.dx = 0;
    // }
    if (world.isAvailable(position.offset(0, 1))) {
      this.velocity.dy += 0.01 * delta;
    }

    // move along path until blocked to destination
    const path = world.getPath(position, position.add(this.velocity));
    let prev = position;
    for (const pos of path) {
      if (!world.isAvailable(pos)) break;
      world.swap(prev, pos);
      prev = pos;
    }
  }
}
