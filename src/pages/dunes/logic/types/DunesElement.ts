import type { PixelPainter } from '../../components/WorldCanvas/Canvas/renderers/PixelPainter';
import type { World } from '../World';
import type { Color } from './Color';
import type { Position } from './Position';
import type { Velocity } from './Velocity';

export interface DunesElement {
  position: Position;
  velocity: Velocity;
  color: Color;
  isUpdated: boolean;

  /** Update this elements position/state based on its position in the world. */
  update: (world: World, deltaS: number) => void;
  /** Define how this element should be drawn at the given position */
  draw: (painter: PixelPainter) => void;
  /** Define how this element should be visualized while debugging */
  debug?: (painter: PixelPainter) => void;
}
