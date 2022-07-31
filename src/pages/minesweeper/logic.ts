// This is where all the game specific logic goes
export enum Difficulty {
  BEGINNER,
  INTERMEDIATE,
  EXPERT,
}

export class GameTile {
  isHidden: boolean = true;
  isFlagged: boolean = false;
  isBomb: boolean = false;
  numConnectedBombs: number = 0;

  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class Game {
  difficulty: Difficulty;
  board: GameTile[][];
  width: number;
  height: number;
  numBombs: number;
  numRemainingFlags: number;
  hasInitializedBombs: boolean = false;
  isLost: boolean = false;
  isWon: boolean = false;

  constructor(difficulty: Difficulty) {
    this.difficulty = difficulty;

    switch (this.difficulty) {
      case Difficulty.BEGINNER:
        this.height = 8;
        this.width = 8;
        this.numBombs = 10;
        break;
      case Difficulty.INTERMEDIATE:
        this.height = 16;
        this.width = 16;
        this.numBombs = 40;
        break;
      case Difficulty.EXPERT:
        this.height = 30;
        this.width = 16;
        this.numBombs = 99;
    }
    this.board = [];
    for (var y = 0; y < this.height; y++) {
      let row: GameTile[] = [];
      for (var x = 0; x < this.width; x++) {
        row.push(new GameTile(x, y));
      }
      this.board.push(row);
    }
    this.numRemainingFlags = this.numBombs;
  }

  /** Return tile at `(x,y)`, or undefined if coord is invalid */
  getTile(x: number, y: number): GameTile | undefined {
    if (x < 0 || this.width <= x) return undefined;
    if (y < 0 || this.height <= y) return undefined;
    return this.board[y][x];
  }

  /** Convert index from 0 to numTiles to its coordinates */
  getCoordinates(index: number): [number, number] {
    let x = Math.floor(index % this.width);
    let y = Math.floor(index / this.width);
    return [x, y];
  }

  /** Convert coordinate to index/number from 0 to numTiles */
  getIndex(x: number, y: number): number {
    return y * this.width + x;
  }

  initBombs(x: number, y: number): void {
    let clicked = this.getTile(x, y)!;
    let numTiles = this.width * this.height;
    // create list of all possible bombIds
    let validBombIds: number[] = Array.from(Array(numTiles).keys());
    // remove clicked tile and all its neighbors
    let toRemove: GameTile[] = [clicked, ...this.getNeighbors(clicked)];
    for (let tile of toRemove) {
      validBombIds = validBombIds.filter(
        (id) => id !== this.getIndex(tile.x, tile.y)
      );
    }
    // add bombs
    for (var bomb = 0; bomb < this.numBombs; bomb++) {
      // extract random coordinates from valid bombIds
      let randomIndex = Math.floor(Math.random() * validBombIds.length);
      let newRandomId = validBombIds[randomIndex];
      validBombIds = validBombIds.filter((id) => id !== newRandomId);
      let [x, y] = this.getCoordinates(newRandomId);
      let newBomb = this.getTile(x, y)!;
      // Set this tile as a bomb
      newBomb.isBomb = true;
      // increase bomb count for all neighbors
      for (let tile of this.getNeighbors(newBomb)) {
        tile.numConnectedBombs += 1;
      }
    }
    this.hasInitializedBombs = true;
  }

  /** Return list of all neighboring tiles */
  getNeighbors(tile: GameTile): GameTile[] {
    let neighbors = [];
    // prettier-ignore
    let offsets = [
      [-1,-1], [0,-1],  [1,-1],
      [-1, 0]/*[x, y]*/,[1, 0],
      [-1, 1], [0, 1],  [1, 1],
    ];
    for (let offset of offsets) {
      let neighbor = this.getTile(tile.x + offset[0], tile.y + offset[1]);
      if (neighbor === undefined) continue;
      neighbors.push(neighbor);
    }
    return neighbors;
  }

  /** Unhide this tile, and recursively unhide all neighbors if tile is blank */
  reveal(x: number, y: number): void {
    let tile = this.getTile(x, y)!;
    tile.isHidden = false;
    if (tile.numConnectedBombs > 0) return;
    for (let neighbor of this.getNeighbors(tile)) {
      if (tile.isFlagged) continue;
      if (!neighbor.isHidden) continue;
      this.reveal(neighbor.x, neighbor.y);
    }
  }

  /** Game is won if all non-bomb tiles are no longer hidden */
  checkIfWon() {
    if (this.isWon) return;
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        let tile = this.getTile(x, y)!;
        if (tile.isBomb) continue;
        if (tile.isHidden) return;
      }
    }
    this.isWon = true;
  }

  /** Set all bomb tiles `isHidden` to `false`*/
  revealBombs(): void {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        let tile = this.getTile(x, y)!;
        if (!tile.isBomb) continue;
        if (tile.isFlagged) continue;
        tile.isHidden = false;
      }
    }
  }

  toggleFlag(x: number, y: number) {
    if (this.numRemainingFlags === 0) return;
    let tile = this.getTile(x, y)!;
    if (tile.isFlagged) {
      tile.isFlagged = false;
      this.numRemainingFlags += 1;
    } else {
      tile.isFlagged = true;
      this.numRemainingFlags -= 1;
    }
  }

  copy(): Game {
    let newGame = new Game(this.difficulty);
    newGame.board = [...this.board];
    newGame.hasInitializedBombs = this.hasInitializedBombs;
    newGame.isLost = this.isLost;
    newGame.isWon = this.isWon;
    newGame.numRemainingFlags = this.numRemainingFlags;
    return newGame;
  }
}
