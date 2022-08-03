export enum Difficulty {
  BEGINNER,
  INTERMEDIATE,
  EXPERT,
}

export class GameTile {
  x: number;
  y: number;

  isHidden: boolean = true;
  isFlagged: boolean = false;
  isBomb: boolean = false;
  numConnectedBombs: number = 0;

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
  isSaved: boolean = false;
  time: number = 0;

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
    this.numRemainingFlags = this.numBombs;
    this.board = [];
    for (var y = 0; y < this.height; y++) {
      let row: GameTile[] = [];
      for (var x = 0; x < this.width; x++) {
        row.push(new GameTile(x, y));
      }
      this.board.push(row);
    }
  }

  /** Return tile at `(x,y)` */
  getTile(x: number, y: number): GameTile {
    if (!this.isTile(x, y))
      throw new Error(`Invalid Minesweeper coords: (${x},${y})`);
    return this.board[y][x];
  }

  /** Check if `(x,y)` falls withing the board */
  isTile(x: number, y: number): boolean {
    if (x < 0 || this.width <= x) return false;
    if (y < 0 || this.height <= y) return false;
    return true;
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

  /** Initialize all bombs while avoiding the first clicked tile */
  initBombs(x: number, y: number): void {
    let clicked = this.getTile(x, y);
    // create list of all possible bombIds
    let numTiles = this.width * this.height;
    let validBombIds: number[] = Array.from(Array(numTiles).keys());
    // remove clicked tile and all its neighbors
    let toRemove: GameTile[] = [
      clicked,
      ...this.getNeighbors(clicked.x, clicked.y),
    ];
    for (let remove of toRemove) {
      validBombIds = validBombIds.filter(
        (id) => id !== this.getIndex(remove.x, remove.y)
      );
    }
    // add bombs
    for (var bombNum = 0; bombNum < this.numBombs; bombNum++) {
      // extract random coordinates from valid bombIds
      let randomIndex = Math.floor(Math.random() * validBombIds.length);
      let randomId = validBombIds[randomIndex];
      let [x, y] = this.getCoordinates(randomId);
      // Set this tile as a bomb
      let bomb = this.getTile(x, y);
      bomb.isBomb = true;
      // increase bomb count for all neighbors
      for (let tile of this.getNeighbors(bomb.x, bomb.y)) {
        tile.numConnectedBombs += 1;
      }
      // Remove bomb id from the list
      validBombIds = validBombIds.filter((id) => id !== randomId);
    }
    this.hasInitializedBombs = true;
  }

  /** Return list of all neighboring tiles */
  getNeighbors(x: number, y: number): GameTile[] {
    let tile = this.getTile(x, y);
    let neighbors = [];
    // prettier-ignore
    let offsets = [
      [-1,-1], [0,-1],  [1,-1],
      [-1, 0]/*[x, y]*/,[1, 0],
      [-1, 1], [0, 1],  [1, 1],
    ];
    for (let offset of offsets) {
      let [x, y] = [tile.x + offset[0], tile.y + offset[1]];
      if (!this.isTile(x, y)) continue;
      let neighbor = this.getTile(x, y);
      neighbors.push(neighbor);
    }
    return neighbors;
  }

  /** Unhide this tile, and recursively unhide all neighbors of blank tiles */
  reveal(x: number, y: number): void {
    let tile = this.getTile(x, y);
    if (tile.isBomb) return;
    tile.isHidden = false;
    if (tile.numConnectedBombs > 0) return;
    for (let neighbor of this.getNeighbors(tile.x, tile.y)) {
      if (neighbor.isFlagged) continue;
      if (!neighbor.isHidden) continue;
      this.reveal(neighbor.x, neighbor.y);
    }
  }

  /** Game is won if all non-bomb tiles are no longer hidden */
  checkIfWon() {
    if (this.isWon) return;
    for (let row of this.board) {
      for (let tile of row) {
        if (tile.isBomb) continue;
        if (tile.isHidden) return;
      }
    }
    this.isWon = true;
  }

  /** Set all bomb tiles `isHidden` to `false`*/
  revealBombs(): void {
    for (let row of this.board) {
      for (let tile of row) {
        if (!tile.isBomb) continue;
        if (tile.isFlagged) continue;
        tile.isHidden = false;
      }
    }
  }

  toggleFlag(x: number, y: number) {
    if (this.numRemainingFlags === 0) return;
    let tile = this.getTile(x, y);
    if (tile.isFlagged) {
      tile.isFlagged = false;
      this.numRemainingFlags += 1;
    } else {
      tile.isFlagged = true;
      this.numRemainingFlags -= 1;
    }
  }

  getScore() {
    let score = 0;
    for (let row of this.board) {
      for (let tile of row) {
        // Number of Revealed Tiles
        if (!tile.isHidden && !tile.isBomb) score += 10;
        // Adjust based on Correct/False flag placement
        if (tile.isFlagged) {
          if (tile.isBomb) score += 50;
          else score -= 25;
        }
      }
    }
    return score;
  }

  copy(): Game {
    let copy = new Game(this.difficulty);
    copy.board = this.board;
    copy.numRemainingFlags = this.numRemainingFlags;
    copy.hasInitializedBombs = this.hasInitializedBombs;
    copy.isLost = this.isLost;
    copy.isWon = this.isWon;
    copy.isSaved = this.isSaved;
    copy.time = this.time;
    return copy;
  }
}
