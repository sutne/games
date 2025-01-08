import type { Color } from '../../../../logic/types/Color';
import type { Position } from '../../../../logic/types/Position';

export class PixelPainter {
  private context: CanvasRenderingContext2D;
  private image: ImageData;

  constructor(
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) {
    this.context = context;
    this.image = this.context.createImageData(width, height);
  }

  setPixel(position: Position, color: Color) {
    let i: number =
      (position.int_y * this.context.canvas.width + position.int_x) << 2;
    this.image.data[i++] = color.r;
    this.image.data[i++] = color.g;
    this.image.data[i++] = color.b;
    this.image.data[i] = color.a ?? 255;
  }

  draw() {
    this.context.putImageData(this.image, 0, 0);
  }
}
