export class RuleSet {
  cursorSize: number;
  isPaused: boolean;
  gravity: number;
  rightClickAction: "erase" | "solid";

  constructor(
    props: { isPaused?: boolean; cursorSize?: number; gravity?: number; rightClickAction?: "erase" | "solid" } = {}
  ) {
    this.isPaused = props.isPaused ?? false;
    this.cursorSize = props.cursorSize ?? 1;
    this.gravity = props.gravity ?? 9.81;
    this.rightClickAction = props.rightClickAction ?? "erase";
  }

  getGravityAcceleration(delta: number): number {
    return this.gravity * Math.sqrt(delta);
  }
}
