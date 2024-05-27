import { Position } from "../types/Position";
import { DunesElement } from "./DunesElement";

export class Solid implements DunesElement {
  isUpdated = false;
  velocity = { dx: 0, dy: 0 };
  color = "rgb(10,20,30)";

  draw(position: Position, context: CanvasRenderingContext2D): void {
    context.fillStyle = this.color;
    context.fillRect(position.x, position.y, 1, 1);
  }

  update(): void {
    // Do nothing
  }
}
