import { RuleSet } from "../RuleSet";
import { Air } from "./models/Air";
import { DunesElement } from "./models/DunesElement";
import { Solid } from "./models/Solid";
import { Position } from "./types/Position";
import { Painter } from "./Painter";

export class World {
  width: number;
  height: number;
  elements: DunesElement[][];
  ruleset: RuleSet;

  constructor(width: number, height: number, ruleset: RuleSet) {
    this.width = width;
    this.height = height;
    this.elements = this.initializeArray();
    this.ruleset = ruleset;
  }

  private initializeArray(): DunesElement[][] {
    const elements = new Array(this.width).fill(null).map(() => new Array(this.height).fill(new Air()));
    //randomly set elements to be solid
    for (let x = 0; x < this.width; x++) {
      for (let y = this.height - 1; this.height * 0.93 <= y; y--) {
        if (elements[x]?.[y + 1] instanceof Air) continue;
        const isBelow5Percent = y >= this.height - this.height * 0.05;
        const hasSolidOnLeft = elements[x - 1]?.[y] instanceof Solid;
        const hasSolidOnRight = elements[x + 1]?.[y] instanceof Solid;
        if (elements[x - 1]?.[y + 1] instanceof Air && elements[x + 1]?.[y + 1] instanceof Air) continue;
        if (
          isBelow5Percent ||
          (hasSolidOnLeft && Math.random() < 0.8) ||
          (hasSolidOnRight && Math.random() < 0.8) ||
          Math.random() < 0.4
        ) {
          elements[x][y] = new Solid();
        }
      }
    }
    return elements;
  }

  /** Return the element at the given position, or undefined if no element exists there */
  get(position: Position): DunesElement {
    const { x, y } = position;
    return this.elements[x % this.elements.length][y];
  }

  /** Assign the given element to the given position. */
  set(position: Position, element: DunesElement): void {
    const { x, y } = position;
    this.elements[x][y] = element;
  }

  isAvailable(position: Position): boolean {
    return this.get(position) instanceof Air;
  }

  isValid(position: Position): boolean {
    if (position.x < 0 || this.width <= position.x) return false;
    if (position.y < 0 || this.height <= position.y) return false;
    return true;
  }

  /** place element at origin at destination. */
  swap(origin: Position, destination: Position): void {
    if (origin.equals(destination)) return;
    const originElement = this.get(origin);
    this.set(origin, this.get(destination));
    this.set(destination, originElement);
  }

  /** return positions in order along the shortest path, excluding `from` */
  getPath(from: Position, to: Position): Position[] {
    if (to.equals(from)) return [];
    const path: Position[] = [];
    const xDistance = to.x - from.x;
    const yDistance = to.y - from.y;
    const pathLength = Math.max(Math.abs(xDistance) + Math.abs(yDistance));
    const xStep = xDistance / pathLength;
    const yStep = yDistance / pathLength;
    for (let i = 0; i <= pathLength; i++) {
      const pos = new Position((from.x + i * xStep) % this.width, from.y + i * yStep);
      if (pos.equals(from)) continue; // skip the from position
      path.push(pos);
    }
    return path;
  }

  /** Perform the callback for each element in the world, starting in bottom left. */
  forEachElement(callback: (element: DunesElement, position: Position) => void): void {
    for (let y = this.height - 1; 0 <= y; y--) {
      if (Math.random() < 0.5) {
        for (let x = 0; x < this.width; x++) {
          const pos = new Position(x, y);
          callback(this.get(pos), pos);
        }
      } else {
        for (let x = this.width - 1; x >= 0; x--) {
          const pos = new Position(x, y);
          callback(this.get(pos), pos);
        }
      }
    }
  }

  draw(painter: Painter): void {
    painter.clear();
    this.forEachElement((element, position) => {
      element.draw(position, painter);
      element.isUpdated = false; // reset for next update
    });
  }

  update(delta: number): void {
    if (this.ruleset.isPaused) return;
    this.forEachElement((element, position) => {
      if (element.isUpdated) return;
      element.update(position, this, delta);
      element.isUpdated = true;
    });
  }

  clear(): void {
    this.elements = this.initializeArray();
  }
}
