import { Painter } from "../Painter";
import { Position } from "../types/Position";
import { DunesElement } from "./DunesElement";

export class Air implements DunesElement {
  isUpdated = false;
  velocity = { dx: 0, dy: 0 };
  color = "rgb(0, 0, 0, 0)";

  draw(position: Position, painter: Painter): void {
    painter.drawPixel(position.x, position.y, this.color);
  }

  update(): void {
    // Do nothing
  }
}
