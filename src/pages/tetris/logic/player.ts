export class Player {
  shape: string[][];
  startX: number;
  startY: number;
  x: number;
  y: number;

  constructor(shape: string[][], x: number, y: number) {
    this.startX = x;
    this.startY = y;
    this.x = x;
    this.y = y;
    this.shape = shape;
  }

  rotate(direction: "clockwise" | "counter-clockwise") {
    console.log(direction);
    const transposed = this.shape.map((_, index) =>
      this.shape.map((col) => col[index])
    );
    if (direction === "clockwise") {
      this.shape = transposed.reverse();
    } else {
      this.shape = transposed.map((row) => row.reverse());
    }
  }

  resetPosition() {
    this.x = this.startX;
    this.y = this.startY;
  }
}
