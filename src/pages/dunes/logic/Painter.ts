export class Painter {
  context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  clear() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

  drawPixel(x: number, y: number, color: string) {
    this.context.fillStyle = color;
    this.context.fillRect(x, y, 1, 1);
  }
}
