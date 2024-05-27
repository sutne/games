import { Sand } from "./models/Sand";
import { Position } from "./types/Position";
import { Velocity } from "./types/Velocity";
import { World } from "./World";

export class Mouse {
  previousInteractPosition: Position; // to interpolate quick movements
  position: Position;
  velocity: Velocity;
  isLeftButtonPressed: boolean;
  isRightButtonPressed: boolean;

  constructor() {
    this.previousInteractPosition = { x: 0, y: 0 };
    this.position = { x: 0, y: 0 };
    this.velocity = { dx: 0, dy: 0 };
    this.isLeftButtonPressed = false;
    this.isRightButtonPressed = false;
  }

  onClick(event: MouseEvent): void {
    this.isLeftButtonPressed = event.button === 0;
    this.isRightButtonPressed = event.button === 2;
  }

  onRelease(): void {
    this.isLeftButtonPressed = false;
    this.isRightButtonPressed = false;
  }

  onMove(event: MouseEvent, canvas: HTMLCanvasElement): void {
    const rect = canvas.getBoundingClientRect();
    this.position.x = Math.floor(((event.clientX - rect.left) * canvas.width) / rect.width);
    this.position.y = Math.floor(((event.clientY - rect.top) * canvas.height) / rect.height);
    this.velocity.dx = (event.movementX / rect.width) * canvas.width;
    this.velocity.dy = (event.movementY / rect.height) * canvas.height;
  }

  /** Add elements to the world according to mouse state and location */
  interact(world: World): void {
    // const radius = world.ruleset.cursorSize - 1;
    if (this.isLeftButtonPressed) {
      const interactPositions: Position[] = [this.previousInteractPosition];
      interactPositions.push(...world.getPath(this.previousInteractPosition, this.position));

      for (const interactPosition of interactPositions) {
        if (!world.isAvailable(interactPosition)) continue;
        world.set(interactPosition, new Sand());

        // interact in radius around the mouse
        // for (let x = interactPosition.x - radius; x <= Math.ceil(interactPosition.x + radius); x++) {
        //   for (let y = interactPosition.y - radius; y <= Math.ceil(interactPosition.y + radius); y++) {
        //     const pos: Position = { x, y };
        //     if (!world.isAvailable(pos)) continue;
        //     if (distance({ x, y }, interactPosition) > radius) continue;
        //   }
        // }
      }
    }
    this.previousInteractPosition = { ...this.position };
  }
}
