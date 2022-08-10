export class Cell {
  x: number;
  y: number;

  isHidden = true;
  isFlagged = false;
  isMine = false;
  numConnectedMines = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
