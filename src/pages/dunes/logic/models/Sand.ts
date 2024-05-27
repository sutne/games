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

  constructor(velocity: Velocity = { dx: 0, dy: 0 }) {
    this.velocity = velocity;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  draw(position: Position, context: CanvasRenderingContext2D): void {
    context.fillStyle = this.color;
    context.fillRect(position.x, position.y, 1, 1);
  }

  update(position: Position, world: World): void {
    const { x, y } = position;
    if (world.isAvailable({ x, y: y + 1 })) {
      this.velocity.dy += world.ruleset.gravity;
    }
    let destination: Position = { x: x + this.velocity.dx, y: y + this.velocity.dy };
    const path = world.getPath(position, destination);
    let prev = position;
    for (const pos of path) {
      if (!world.isAvailable(pos)) {
        this.velocity.dy = 0;
        this.velocity.dx = 0;
        destination = prev;
        break;
      }
      prev = pos;
    }

    world.swap(position, destination);
  }
}
