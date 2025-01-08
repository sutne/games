import type { World } from '../World';
import type { PixelPainter } from '../renderers/PixelPainter';
import type { Color } from '../types/Color';
import type { DunesElement } from '../types/DunesElement';
import { Position } from '../types/Position';
import type { Velocity } from '../types/Velocity';
import { randomNormal, randomSign } from '../util/random';

const GRAVITY = 512; // pixels/s²
const BOUNCE_FACTOR = 0.4; // how much energy is "preserved" when bouncing of sideways
const FRICTION_FACTOR = 0.8; // in range [0, 1], higher = more friction
const MAX_COLLISION_COUNT = 16; // max collisions per element to handle in a single "update"
const VISCOSITY = 25;

export class Water implements DunesElement {
  position: Position;
  velocity: Velocity;
  color: Color;
  isUpdated = false;

  constructor(position: Position) {
    this.position = position;
    this.velocity = {
      dx: randomNormal(-0.1, 0.1),
      dy: 0,
    };
    this.color = { r: 68, g: 153, b: 244 };
  }

  draw(painter: PixelPainter) {
    const heightFactor = this.position.y * -0.35;
    const velocityBoost = 1 < Math.abs(this.velocity.dx) ? 30 : 0;
    const horizontalBoost = 2 * Math.abs(this.velocity.dx);
    const velocityFactor = velocityBoost + horizontalBoost;
    painter.setPixel(this.position, {
      r: this.color.r + heightFactor + velocityFactor,
      g: this.color.g + heightFactor + velocityFactor,
      b: this.color.b + heightFactor + velocityFactor,
      a: 0.85 * 255 + velocityFactor,
    });
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

  let newPosition = flow(world, position, velocity);
  const newVelocity = { ...velocity };

  if (world.isAvailable(position.offset(0, 1))) {
    newVelocity.dy += GRAVITY * deltaS;
  } else {
    const below = world.get(position.offset(0, 1));

    newVelocity.dy = below.velocity.dy;
    const dxDirection =
      velocity.dx !== 0 ? (Math.sign(velocity.dx) as 1 | -1) : randomSign();
    let hasFreeSide = false;
    for (const dir of [dxDirection, -1 * dxDirection]) {
      if (world.isAvailable(position.offset(dir, 0))) {
        hasFreeSide = true;
        newVelocity.dx = dir * VISCOSITY;
        break;
      }
    }
    if (!hasFreeSide) {
      newVelocity.dx = 0;
    }
    if (!(below instanceof Water)) {
      newVelocity.dx *= 1 - FRICTION_FACTOR;
    }
  }

  if (newVelocity.dx !== 0) {
    const dir = Math.sign(newVelocity.dx);
    if (!world.isAvailable(position.offset(dir, 0))) {
      newVelocity.dx *= -BOUNCE_FACTOR;
    }
  }

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

function flow(world: World, position: Position, velocity: Velocity): Position {
  if (!world.isInside(position.offset(0, 1))) return position;
  const below = world.get(position.offset(0, 1));
  if (!(below instanceof Water)) return position;

  const dxDirection =
    velocity.dx !== 0 ? (Math.sign(velocity.dx) as 1 | -1) : randomSign();
  for (const dir of [dxDirection, -1 * dxDirection]) {
    for (let i = 1; i <= VISCOSITY; i++) {
      const sidePos = position.offset(dir * i, 0);
      if (!world.isAvailable(sidePos)) break;
      const diagPos = position.offset(dir * i, 1);
      if (!world.isAvailable(diagPos)) continue;
      return diagPos;
    }
  }
  return position;
}
