import { Painter } from "../Painter";
import { Position } from "../types/Position";
import { DunesElement } from "./DunesElement";

const colors: string[] = ["rgb(48,42,34)", "rgb(47,36,30)", "rgb(59,42,34)"];

export class Solid implements DunesElement {
  isUpdated = false;
  velocity = { dx: 0, dy: 0 };
  color: string;

  constructor() {
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  draw(position: Position, painter: Painter): void {
    painter.drawPixel(position.x, position.y, this.color);
  }

  update(): void {
    // Do nothing
  }
}
