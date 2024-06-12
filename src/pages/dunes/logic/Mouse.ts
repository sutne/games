import { Air } from "./models/Air";
import { Sand } from "./models/Sand";
import { Solid } from "./models/Solid";
import { Position } from "./types/Position";
import { Velocity } from "./types/Velocity";
import { World } from "./World";

export class Mouse {
  previousInteractPosition: Position | undefined; // to interpolate quick movements
  position: Position;
  velocity: Velocity;
  isLeftButtonPressed: boolean;
  isRightButtonPressed: boolean;

  constructor() {
    this.previousInteractPosition = new Position(0, 0);
    this.position = new Position(0, 0);
    this.velocity = { dx: 0, dy: 0 };
    this.isLeftButtonPressed = false;
    this.isRightButtonPressed = false;
  }

  onPress(event: MouseEvent): void {
    this.isLeftButtonPressed = event.button === 0;
    this.isRightButtonPressed = event.button === 2;
  }

  onRelease(): void {
    this.isLeftButtonPressed = false;
    this.isRightButtonPressed = false;
    this.previousInteractPosition = undefined;
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
    const radius = Math.floor(world.ruleset.cursorSize / 2);
    const start = this.previousInteractPosition ?? this.position;
    const mousePositions: Position[] = world.getPath(start, this.position);
    mousePositions.push(start);
    const interactPositions: Position[] = [];

    for (const mousePos of mousePositions) {
      for (let x = -radius; x <= radius; x++) {
        for (let y = -radius; y <= radius; y++) {
          const pos = mousePos.offset(x, y);
          if (!world.isValid(pos)) continue;
          if (pos.distance(mousePos) > radius) continue;
          interactPositions.push(pos);
        }
      }
    }

    if (this.isLeftButtonPressed) {
      for (const pos of interactPositions) {
        if (!world.isAvailable(pos)) continue;
        if (Math.random() > 1 / world.ruleset.cursorSize) continue;
        world.set(pos, new Sand({ ...this.velocity }));
      }
    } else if (this.isRightButtonPressed) {
      if (world.ruleset.rightClickAction === "erase") {
        for (const pos of interactPositions) {
          if (world.isAvailable(pos)) continue;
          if (world.get(pos) instanceof Solid) continue;
          world.set(pos, new Air());
        }
      } else {
        for (const pos of interactPositions) {
          if (!world.isAvailable(pos)) continue;
          world.set(pos, new Solid());
        }
      }
    }
    this.previousInteractPosition = this.position.copy();
  }
}
