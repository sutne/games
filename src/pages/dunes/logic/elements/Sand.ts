import type { World } from '../World';
import type { PixelPainter } from '../renderers/PixelPainter';
import type { Color } from '../types/Color';
import type { DunesElement } from '../types/DunesElement';
import { Position } from '../types/Position';
import type { Velocity } from '../types/Velocity';
import { randomElementNormal, randomNormal, randomSign } from '../util/random';

const GRAVITY = 512; // pixels/s²
const BOUNCE_FACTOR = 0.6; // how much energy is "preserved" when bouncing
const FRICTION_FACTOR = 0.8; // 0=no friction
const MAX_COLLISION_COUNT = 16; // max collisions per element to handle in a single "update"

const colors: Color[] = [
  { r: 232, g: 170, b: 111 },
  { r: 247, g: 209, b: 151 },
  { r: 255, g: 202, b: 138 },
  { r: 251, g: 216, b: 162 },
  { r: 249, g: 203, b: 141 },
  { r: 228, g: 173, b: 134 },
];

export class Sand implements DunesElement {
  position: Position;
  velocity: Velocity;
  color: Color;
  isUpdated = false;

  constructor(position: Position) {
    this.position = position;
    this.velocity = {
      dx: randomNormal(-0.1, 0.1),
      dy: randomNormal(0, GRAVITY * 0.2),
    };
    this.color = randomElementNormal(colors);
  }

  draw(painter: PixelPainter) {
    painter.setPixel(this.position, this.color);
  }

  debug(painter: PixelPainter) {
    painter.setPixel(this.position, {
      r: 5 * Math.abs(this.velocity.dx),
      g: 0.5 * Math.abs(this.velocity.dy),
      b: 255 / 2,
    });
  }

  update(world: World, deltaS: number) {
    const { newPosition, newVelocity } = move(
      world,
      this.position,
      this.velocity,
      deltaS,
    );
    this.position = newPosition;
    this.velocity = newVelocity;
  }
}

function move(
  world: World,
  position: Position,
  velocity: Velocity,
  deltaS: number,
  collisionCount = 0,
): { newPosition: Position; newVelocity: Velocity } {
  if (collisionCount === MAX_COLLISION_COUNT) {
    return { newPosition: position, newVelocity: velocity };
  }

  const newVelocity = updateVelocity(world, position, velocity, deltaS);
  const distance = {
    dx: newVelocity.dx * deltaS,
    dy: newVelocity.dy * deltaS,
  };
  const pathLength = Math.max(
    1,
    Math.ceil(Math.abs(distance.dx) + Math.abs(distance.dy)),
  );
  const dx = distance.dx / pathLength;
  const dy = distance.dy / pathLength;
  let newPosition = position;

  for (let i = 0; i < pathLength; i++) {
    const pos = newPosition.move({ dx, dy });
    if (pos.equals(newPosition) || world.isAvailable(pos)) {
      newPosition = pos;
      continue;
    }

    // check if collided when moving diagonally, to see if one of the axes are available
    if (
      Math.abs(pos.int_x - newPosition.int_x) === 1 &&
      Math.abs(pos.int_y - newPosition.int_y) === 1
    ) {
      if (world.isAvailable(newPosition.offset(0, Math.sign(dy)))) {
        newPosition = new Position(newPosition.x, newPosition.y + dy);
      }
      if (world.isAvailable(newPosition.offset(Math.sign(dx), 0))) {
        newPosition = new Position(newPosition.x + dx, newPosition.y);
      }
    }

    // collision
    return move(
      world,
      newPosition,
      newVelocity,
      deltaS - deltaS * ((i + 1) / pathLength),
      collisionCount + 1,
    );
  }
  return { newPosition, newVelocity };
}

function updateVelocity(
  world: World,
  position: Position,
  velocity: Velocity,
  deltaS: number,
): Velocity {
  const newVelocity = { ...velocity };
  if (world.isAvailable(position.offset(0, 1))) {
    newVelocity.dy += GRAVITY * deltaS;
  } else {
    const below = world.get(position.offset(0, 1));
    newVelocity.dy = below.velocity.dy;
    const dyChange = newVelocity.dy - velocity.dy;

    const dxDirection =
      velocity.dx !== 0 ? (Math.sign(velocity.dx) as 1 | -1) : randomSign();
    let hasFreeSide = false;
    for (const dir of [dxDirection, -1 * dxDirection]) {
      if (world.isAvailable(position.offset(dir, 1))) {
        if (dyChange < 0) {
          newVelocity.dx += dir * dyChange * randomNormal(0.5, 0.9);
        }
        const diagonalVelocity = GRAVITY * deltaS;
        newVelocity.dx += dir * diagonalVelocity;
        newVelocity.dy += diagonalVelocity;
        hasFreeSide = true;
        break;
      }
    }
    if (!hasFreeSide) {
      newVelocity.dx *= 1 - Math.min(1, FRICTION_FACTOR * deltaS);
    }
  }

  if (newVelocity.dx !== 0) {
    const dir = Math.sign(newVelocity.dx);
    if (!world.isAvailable(position.offset(dir, 0))) {
      newVelocity.dx *= -BOUNCE_FACTOR;
    }
  }

  return newVelocity;
}
