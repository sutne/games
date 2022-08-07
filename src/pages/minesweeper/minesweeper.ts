export enum MinesweeperDifficulty {
  BEGINNER,
  INTERMEDIATE,
  EXPERT,
}

export class MinesweeperTile {
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

type MinesweeperStats = {
  numCorrectFlags: number;
  clearPercentage: number;
  time: number;
};

export class Minesweeper {
  // Settings
  difficulty: MinesweeperDifficulty;
  board: MinesweeperTile[][];
  width: number;
  height: number;
  numMines: number;
  numRemainingFlags: number;
  // State
  isStarted = false;
  isLost = false;
  isWon = false;
  isSaved = false;
  startTime = 0;
  stats: MinesweeperStats = { time: 0, clearPercentage: 0, numCorrectFlags: 0 };

  copy(): Minesweeper {
    const copy: Minesweeper = new Minesweeper(this.difficulty);
    copy.board = this.board;
    copy.numRemainingFlags = this.numRemainingFlags;
    copy.isStarted = this.isStarted;
    copy.isLost = this.isLost;
    copy.isWon = this.isWon;
    copy.isSaved = this.isSaved;
    copy.startTime = this.startTime;
    copy.stats = this.stats;
    return copy;
  }

  constructor(difficulty: MinesweeperDifficulty) {
    this.difficulty = difficulty;
    switch (this.difficulty) {
      case MinesweeperDifficulty.BEGINNER:
        this.height = 8;
        this.width = 8;
        this.numMines = 10;
        break;
      case MinesweeperDifficulty.INTERMEDIATE:
        this.height = 16;
        this.width = 16;
        this.numMines = 40;
        break;
      case MinesweeperDifficulty.EXPERT:
        this.height = 30;
        this.width = 16;
        this.numMines = 99;
    }
    this.numRemainingFlags = this.numMines;
    this.board = [];
    for (let y = 0; y < this.height; y++) {
      const row: MinesweeperTile[] = [];
      for (let x = 0; x < this.width; x++) {
        row.push(new MinesweeperTile(x, y));
      }
      this.board.push(row);
    }
  }

  /** Initialize all mines while avoiding the first clicked tile (x,y) */
  start(x: number, y: number): void {
    if (this.isStarted) return;
    this.isStarted = true;
    const clicked = this._getTile(x, y);
    // create list of all possible mineIds
    const numTiles = this.width * this.height;
    // make sure there isn't more mines than valid tiles to convert to mines
    if (numTiles - 9 < this.numMines) throw new Error("Too many mines!");
    let validMineIds: number[] = Array.from(Array(numTiles).keys());
    // remove clicked tile and all its neighbors from list
    const toRemove: MinesweeperTile[] = [
      clicked,
      ...this._getNeighbors(clicked.x, clicked.y),
    ];
    for (const remove of toRemove) {
      validMineIds = validMineIds.filter(
        (id) => id !== this._getIndex(remove.x, remove.y)
      );
    }
    // add mines
    for (let mineNum = 0; mineNum < this.numMines; mineNum++) {
      // extract random coordinates from valid mineIds
      const randomIndex = Math.floor(Math.random() * validMineIds.length);
      const randomId = validMineIds[randomIndex];
      const [x, y] = this._getCoordinates(randomId);
      // Set this tile as a mine
      const mine = this._getTile(x, y);
      mine.isMine = true;
      // increase mine count for all neighbors
      for (const tile of this._getNeighbors(mine.x, mine.y)) {
        tile.numConnectedMines += 1;
      }
      // Remove mine id from the list
      validMineIds = validMineIds.filter((id) => id !== randomId);
    }
    this.startTime = new Date().getTime();
  }

  /** Unhide this tile, and recursively unhide all neighbors of blank tiles */
  reveal(x: number, y: number): void {
    const tile = this._getTile(x, y);
    // a mine is only revealed if it was clicked directly
    if (tile.isMine) {
      this._stop();
      this._revealMines();
      this.isLost = true;
      return;
    }
    this._revealRecursive(tile);
    this._checkIfWon();
  }

  /** Place/remove flag depending of it there is remaining flags left */
  toggleFlag(x: number, y: number) {
    const tile = this._getTile(x, y);
    if (tile.isFlagged) {
      tile.isFlagged = false;
      this.numRemainingFlags += 1;
    } else {
      if (this.numRemainingFlags === 0) return;
      tile.isFlagged = true;
      this.numRemainingFlags -= 1;
    }
  }

  /** Game is either won or lost */
  isOver(): boolean {
    return this.isLost || this.isWon;
  }

  /** Calculate stats */
  _stop() {
    this.stats.time = new Date().getTime() - this.startTime;
    let cleared = 0;
    for (const row of this.board) {
      for (const tile of row) {
        if (!tile.isHidden && !tile.isMine) cleared += 1;
        if (tile.isFlagged && tile.isMine) this.stats.numCorrectFlags += 1;
      }
    }
    const numNonMineTiles = this.width * this.height - this.numMines;
    this.stats.clearPercentage = 100 * (cleared / numNonMineTiles);
  }

  _revealRecursive(tile: MinesweeperTile): void {
    tile.isHidden = false;
    if (tile.numConnectedMines > 0) return;
    for (const neighbor of this._getNeighbors(tile.x, tile.y)) {
      if (neighbor.isFlagged) continue;
      if (!neighbor.isHidden) continue;
      this.reveal(neighbor.x, neighbor.y);
    }
  }

  /** Game is won if all non-mine tiles are no longer hidden */
  _checkIfWon() {
    if (this.isWon || this.isLost) return;
    for (const row of this.board) {
      for (const tile of row) {
        if (tile.isMine) continue;
        if (tile.isHidden) return;
      }
    }
    this._stop();
    this._revealMines();
    this.isWon = true;
  }

  /** Set all mine tiles `isHidden` to `false`*/
  _revealMines(): void {
    for (const row of this.board) {
      for (const tile of row) {
        if (!tile.isMine) continue;
        tile.isHidden = false;
      }
    }
  }

  /** Return tile at `(x,y)` */
  _getTile(x: number, y: number): MinesweeperTile {
    if (!this._isTile(x, y))
      throw new Error(`Invalid Minesweeper coords: (${x},${y})`);
    return this.board[y][x];
  }

  /** Check if `(x,y)` falls withing the board */
  _isTile(x: number, y: number): boolean {
    if (x < 0 || this.width <= x) return false;
    if (y < 0 || this.height <= y) return false;
    return true;
  }

  /** Convert index from 0 to numTiles to its coordinates */
  _getCoordinates(index: number): [number, number] {
    const x = Math.floor(index % this.width);
    const y = Math.floor(index / this.width);
    return [x, y];
  }

  /** Convert coordinate to index/number from 0 to numTiles */
  _getIndex(x: number, y: number): number {
    return y * this.width + x;
  }

  /** Return list of all neighboring tiles */
  _getNeighbors(x: number, y: number): MinesweeperTile[] {
    const tile = this._getTile(x, y);
    const neighbors = [];
    // prettier-ignore
    const offsets = [
      [-1,-1], [0,-1],  [1,-1],
      [-1, 0]/*[x, y]*/,[1, 0],
      [-1, 1], [0, 1],  [1, 1],
    ];
    for (const offset of offsets) {
      const [x, y] = [tile.x + offset[0], tile.y + offset[1]];
      if (!this._isTile(x, y)) continue;
      const neighbor = this._getTile(x, y);
      neighbors.push(neighbor);
    }
    return neighbors;
  }
}
