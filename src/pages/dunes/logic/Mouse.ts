import { Position } from './types/Position';

export class Mouse {
  position: Position;
  isLeftButtonPressed: boolean;
  isRightButtonPressed: boolean;

  previousInteractionPosition: Position | undefined; // to interpolate between quick movements

  constructor() {
    this.position = new Position(0, 0);
    this.previousInteractionPosition = undefined;
    this.isLeftButtonPressed = false;
    this.isRightButtonPressed = false;
  }

  onMove(event: React.MouseEvent, canvas: HTMLCanvasElement): void {
    const rect = canvas.getBoundingClientRect();
    this.position = new Position(
      Math.floor(((event.clientX - rect.left) * canvas.width) / rect.width),
      Math.floor(((event.clientY - rect.top) * canvas.height) / rect.height),
    );
  }

  onPress(event: React.MouseEvent): void {
    this.isLeftButtonPressed = event.button === 0;
    this.isRightButtonPressed = event.button === 2;
  }

  onRelease(): void {
    this.isLeftButtonPressed = false;
    this.isRightButtonPressed = false;
    this.previousInteractionPosition = undefined;
  }
}
