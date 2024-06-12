import { Painter } from "../Painter";
import { Position } from "../types/Position";
import { Velocity } from "../types/Velocity";
import { World } from "../World";

export interface DunesElement {
  velocity: Velocity;
  color: string;
  isUpdated: boolean;

  /** With access to its own location and state, update the pixels accordingly. */
  update: (position: Position, world: World, delta: number) => void;
  /** Defines how this element should be shown at the given position */
  draw: (position: Position, painter: Painter) => void;
}
