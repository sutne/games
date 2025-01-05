import type { PixelPainter } from '../../components/Canvas/renderers/PixelPainter';
import type { Color } from '../types/Color';
import type { Position } from '../types/Position';
import type { Velocity } from '../types/Velocity';
import type { DunesElement } from './DunesElement';

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
  debug = this.draw;

  update() {
    // nothing to update
  }
}
