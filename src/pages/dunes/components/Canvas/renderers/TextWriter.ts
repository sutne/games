import type { Position } from '../../../logic/types/Position';

export class TextWriter {
  context: CanvasRenderingContext2D;
  position: Position;
  fontSize: number;

  /** context to write on, and position of tep left corner of the text "box" */
  constructor(
    context: CanvasRenderingContext2D,
    position: Position,
    fontSize = 18,
  ) {
    this.context = context;
    this.context.font = `${fontSize}px monospace`;
    this.position = position;
    this.fontSize = fontSize;
  }

  write(text: string[], color = 'white') {
    this.clear();
    this.context.fillStyle = color;
    for (let i = 0; i < text.length; i++) {
      const line = text[i];
      const yOffset = this.fontSize * (i + 1);
      this.context.fillText(line, this.position.x, this.position.y + yOffset);
    }
  }

  clear() {
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height,
    );
  }
}
