import { RuleSet } from "../RuleSet";
import { Air } from "./models/Air";
import { DunesElement } from "./models/DunesElement";
import { Solid } from "./models/Solid";
import { equals, Position } from "./types/Position";

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
      for (let y = 0; y < this.height; y++) {
        if (Math.random() < 0.01) elements[x][y] = new Solid();
      }
    }
    return elements;
  }

  private toIndices(position: Position): [number, number] {
    const x = Math.floor(Math.min(Math.max(position.x, 0), this.width - 1));
    const y = Math.floor(Math.min(Math.max(position.y, 0), this.height - 1));
    return [x, y];
  }

  /** Return the element at the given position, or undefined if no element exists there */
  get(position: Position): DunesElement {
    const { x, y } = position;
    return this.elements[x][y];
  }

  /** Assign the given element to the given position. */
  set(position: Position, element: DunesElement): void {
    const { x, y } = position;
    this.elements[x][y] = element;
  }

  isAvailable(position: Position): boolean {
    if (position.x < 0 || this.width <= position.x) return false;
    if (position.y < 0 || this.height <= position.y) return false;
    return this.get(position) instanceof Air;
  }

  /** place element at origin at destination. */
  swap(origin: Position, destination: Position): void {
    if (equals(origin, destination)) return;
    const originElement = this.get(origin);
    this.set(origin, this.get(destination));
    this.set(destination, originElement);
  }

  /** return positions in order along the shortest path, excluding `from` */
  getPath(from: Position, to: Position): Position[] {
    if (equals(from, to)) return [];
    const path: Position[] = [];
    const xDistance = to.x - from.x;
    const yDistance = to.y - from.y;
    const pathLength = Math.max(Math.abs(xDistance) + Math.abs(yDistance));
    const xStep = xDistance / pathLength;
    const yStep = yDistance / pathLength;
    for (let i = 0; i <= pathLength; i++) {
      const x = Math.floor(from.x + i * xStep);
      const y = Math.floor(from.y + i * yStep);
      const pos: Position = { x, y };
      if (equals(pos, from)) continue; // skip the from position
      path.push(pos);
    }
    return path;
  }

  /** Perform the callback for each element in the world, starting in bottom left. */
  forEachElement(callback: (element: DunesElement, position: Position) => void): void {
    for (let x = 0; x < this.elements.length; x++) {
      for (let y = this.elements[x].length - 1; 0 <= y; y--) {
        const pos = { x, y };
        callback(this.get(pos), pos);
      }
    }
  }

  draw(context: CanvasRenderingContext2D): void {
    context.clearRect(0, 0, this.width, this.height);
    this.forEachElement((element, position) => {
      element.draw(position, context);
      element.isUpdated = false;
    });
  }

  update(): void {
    if (this.ruleset.isPaused) return;
    this.forEachElement((element, position) => {
      if (element.isUpdated) return;
      element.update(position, this);
      element.isUpdated = true;
    });
  }

  clear(): void {
    this.elements = this.initializeArray();
  }
}
