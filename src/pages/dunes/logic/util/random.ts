/** return a random float number in the range [min, max) */
export function randomUniform(min: number, max: number): number {
  if (max <= min) return min;
  const u = Math.random();
  return min + u * (max - min);
}

/** Return a random element from the array */
export function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(randomUniform(0, arr.length))];
}
export function randomElementNormal<T>(arr: T[]): T {
  return arr[Math.floor(randomNormal(0, arr.length))];
}

/** return a random float number in the range [min, max) that is normally distributed around the middle value */
export function randomNormal(min = 0, max = 1): number {
  if (max <= min) return min;
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  num = num / 10.0 + 0.5;
  if (num > 1 || num < 0) {
    num = randomNormal(min, max);
  } else {
    num *= max - min;
    num += min;
  }
  return num;
}

/** returns true or false randomly */
export function randomBoolean(): boolean {
  return Math.random() < 0.5;
}

/** returns 1 or -1 randomly */
export function randomSign(): -1 | 1 {
  return randomBoolean() ? -1 : 1;
}
