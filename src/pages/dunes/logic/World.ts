import type { MouseButton } from '../contexts/Mouse';
import type { LeftClickAction, RightClickAction } from '../contexts/Rules';
import { Air } from './elements/Air';
import { Rock } from './elements/Rock';
import { Sand } from './elements/Sand';
import { Water } from './elements/Water';
import type { PixelPainter } from './renderers/PixelPainter';
import type { DunesElement } from './types/DunesElement';
import { Position } from './types/Position';
import { initializeElements } from './util/init';
import { getPath } from './util/paths';
import { randomBoolean } from './util/random';

export class World {
  width: number;
  height: number;
  elements: DunesElement[][];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.elements = initializeElements(this.width, this.height);
  }

  clear(): void {
    this.elements = initializeElements(this.width, this.height);
  }

  clearSand(): void {
    this.forEachElement((e) => {
      if (e instanceof Sand) this.set(e.position, new Air(e.position));
    });
  }

  /** Perform the callback for each element in the world. */
  forEachElement(callback: (element: DunesElement) => void): void {
    for (let y = this.height - 1; 0 <= y; y--) {
      if (randomBoolean()) {
        for (let x = this.width - 1; 0 <= x; x--) {
          const element = this.elements[y][x];
          callback(element);
        }
      } else {
        for (let x = 0; x < this.width; x++) {
          const element = this.elements[y][x];
          callback(element);
        }
      }
    }
  }

  /** Return the element at the given position, or undefined if no element exists there */
  get(position: Position): DunesElement {
    return this.elements[position.int_y][position.int_x];
  }

  /** Assign the given element to the given position. */
  set(position: Position, element: DunesElement): void {
    this.elements[position.int_y][position.int_x] = element;
  }

  isAvailable(position: Position): boolean {
    if (!this.isInside(position)) return true;
    return this.get(position) instanceof Air;
  }

  isSolid(position: Position): boolean {
    if (!this.isInside(position)) return false;
    if (this.get(position) instanceof Rock) return true;
    if (this.get(position) instanceof Sand) return true;
    return false;
  }

  isInside(position: Position): boolean {
    if (!position) return false;
    if (!(0 <= position.int_x && position.int_x < this.width)) return false;
    if (!(0 <= position.int_y && position.int_y < this.height)) return false;
    return true;
  }

  private swap(origin: Position, destination: Position): void {
    if (origin.equals(destination)) return;
    if (!this.isInside(destination)) {
      this.set(origin, new Air(origin));
      return;
    }
    const originElement = this.get(origin);
    const destinationElement = this.get(destination);
    if (destinationElement instanceof Water) {
      destinationElement.velocity.dy = -0.5 * originElement.velocity.dy;
      destinationElement.velocity.dx = 1.5 * originElement.velocity.dx;
    }
    this.set(origin, destinationElement);
    this.set(destination, originElement);
    originElement.position = destination;
    destinationElement.position = origin;
  }

  draw(painter: PixelPainter, isDebugMode: boolean): void {
    this.forEachElement((element) => {
      if (isDebugMode && element.debug) {
        element.debug(painter);
      } else {
        element.draw(painter);
      }
      element.isUpdated = false;
    });
    painter.draw();
  }

  update(deltaS: number): void {
    this.forEachElement((element) => {
      if (element.isUpdated) return;
      const previousPosition = element.position.copy();
      element.update(this, deltaS);
      element.isUpdated = true;
      this.swap(previousPosition, element.position);
    });
  }

  handleMouseInteraction(
    start: Position | undefined,
    end: Position,
    button: MouseButton,
    cursorSize: number,
    leftClickAction: LeftClickAction,
    rightClickAction: RightClickAction,
  ) {
    const mousePositions: Position[] = getPath(start ?? end, end);
    mousePositions.push(start ?? end);

    const interactPositions: Position[] = [];
    const radius = Math.floor(cursorSize / 2);
    for (const mousePos of mousePositions) {
      for (let x = -radius; x <= radius; x++) {
        for (let y = -radius; y <= radius; y++) {
          const pos = mousePos.offset(x, y);
          if (this.isInside(pos) && pos.distance(mousePos) <= radius) {
            interactPositions.push(pos);
          }
        }
      }
    }

    if (button === 'left') {
      for (const pos of interactPositions) {
        if (!this.isAvailable(pos)) continue;
        if (Math.random() > 1 / cursorSize) continue;
        const centered = new Position(pos.int_x + 0.5, pos.int_y + 0.5);
        if (leftClickAction === 'sand') {
          this.set(pos, new Sand(centered));
        } else if (leftClickAction === 'water') {
          this.set(pos, new Water(centered));
        }
      }
    }
    if (button === 'right') {
      if (rightClickAction === 'remove') {
        for (const pos of interactPositions) {
          if (this.isAvailable(pos)) continue;
          this.set(pos, new Air(pos));
        }
      }
      if (rightClickAction === 'rock') {
        for (const pos of interactPositions) {
          if (this.get(pos) instanceof Rock) continue;
          this.set(pos, new Rock(pos));
        }
      }
    }
  }
}
