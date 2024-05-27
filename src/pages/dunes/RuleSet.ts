export class RuleSet {
  cursorSize: number;
  isPaused: boolean;
  gravity: number;

  constructor(isPaused = false, cursorSize = 1, gravity = 1) {
    this.isPaused = isPaused;
    this.cursorSize = cursorSize;
    this.gravity = gravity;
  }
}
