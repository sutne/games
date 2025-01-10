import type { PixelPainter } from '../renderers/PixelPainter';
import type { Color } from '../types/Color';
import type { DunesElement } from '../types/DunesElement';
import type { Position } from '../types/Position';
import type { Velocity } from '../types/Velocity';

export class Air implements DunesElement {
  position: Position;
  velocity: Velocity;
  color: Color;
  isUpdated = false;

  constructor(position: Position) {
    this.position = position;
    this.velocity = { dx: 0, dy: 0 };
    this.color = { r: 0, g: 0, b: 0, a: 0 };
  }

  draw(painter: PixelPainter) {
    painter.setPixel(this.position, this.color);
  }

  update() {
    // nothing to update
  }
}
