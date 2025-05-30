import type { PixelPainter } from '../renderers/PixelPainter';
import type { Color } from '../types/Color';
import type { DunesElement } from '../types/DunesElement';
import type { Position } from '../types/Position';
import type { Velocity } from '../types/Velocity';
import { randomElementNormal } from '../util/random';

const colors: Color[] = [
  { r: 48, g: 42, b: 34 },
  { r: 47, g: 36, b: 30 },
  { r: 49, g: 40, b: 40 },
  { r: 59, g: 42, b: 34 },
];

export class Rock implements DunesElement {
  position: Position;
  velocity: Velocity;
  color: Color;
  isUpdated = false;

  constructor(position: Position) {
    this.position = position;
    this.velocity = { dx: 0, dy: 0 };
    this.color = randomElementNormal(colors);
  }

  draw(painter: PixelPainter) {
    painter.setPixel(this.position, this.color);
  }

  debug(painter: PixelPainter) {
    painter.setPixel(this.position, { r: 0, g: 0, b: 0 });
  }

  update() {
    // nothing to update
  }
}
