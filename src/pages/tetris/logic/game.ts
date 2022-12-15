import { remove } from "utils/lists";

import { blocks } from "./blocks";
import { Player } from "./player";

export class Game {
  //Constants
  width = 13;
  height = 20;
  pieces = "IJLOSTZ";
  // Game Stuff
  next: string;
  stage: string[][];
  player: Player;
  linesCleared = 0;
  blocksPlaced = 0;
  score = 0;
  // States
  isStarted = false;
  isOver = false;
  startTime = 0;
  elapsedTime = 0;
  isSavedToUserDocument = false;
  isSavedToLeaderboard = false;

  copy(): Game {
    const copy = new Game();
    copy.stage = this.stage;
    copy.linesCleared = this.linesCleared;
    copy.blocksPlaced = this.blocksPlaced;
    copy.isStarted = this.isStarted;
    copy.isOver = this.isOver;
    copy.isSavedToUserDocument = this.isSavedToUserDocument;
    copy.isSavedToLeaderboard = this.isSavedToLeaderboard;
    copy.startTime = this.startTime;
    copy.elapsedTime = this.elapsedTime;
    copy.next = this.next;
    copy.player = this.player;
    return copy;
  }

  constructor() {
    this.stage = [];
    for (let y = 0; y < this.height; y++) {
      const row: string[] = [];
      for (let x = 0; x < this.width; x++) {
        row.push("0");
      }
      this.stage.push(row);
    }
    this.next = this.getRandomPiece();
    this.player = new Player(
      blocks[this.getRandomPiece()].shape,
      Math.floor(this.width / 2),
      0
    );
  }

  getNextBlock() {
    this.player.shape = blocks[this.next].shape;
    this.next = this.getRandomPiece();
  }

  start(): void {
    if (this.isStarted) return;
    console.log("starting");
    this.isStarted = true;
    this.startTime = new Date().getTime();
  }

  stop() {
    if (this.isOver) return;
    this.isOver = true;
    this.elapsedTime = new Date().getTime() - this.startTime;
  }

  getRandomPiece() {
    const randomIndex = Math.floor(Math.random() * this.pieces.length);
    return this.pieces.charAt(randomIndex);
  }

  getStageWithPlayer(): string[][] {
    const stageWithPLayer: string[][] = [];
    for (let y = 0; y < this.height; y++) {
      const row: string[] = [];
      for (let x = 0; x < this.width; x++) {
        row.push(this.stage[y][x]);
      }
      stageWithPLayer.push(row);
    }

    stageWithPLayer[this.player.y][this.player.x] = "O";
    return stageWithPLayer;
  }

  move(direction: "left" | "right" | "down") {
    if (direction === "left") this.player.x -= 1;
    if (direction === "right") this.player.x += 1;
    if (direction === "down") this.player.y += 1;
  }

  clearLines() {
    for (let i = 0; i < this.stage.length; i++) {
      const row = this.stage[i];
      let hasGap = false;
      for (const cell of row) {
        if (cell === "0") {
          hasGap = true;
          break;
        }
      }
      if (hasGap) continue;
      // remove the line
      this.linesCleared++;
      remove(this.stage, i);
      // add new line to top of stage
      const newRow: string[] = [];
      for (let x = 0; x < this.width; x++) {
        newRow.push("0");
      }
      this.stage.push(newRow);
    }
  }

  /** Return tile at `(x,y)` */
  _getTile(x: number, y: number): string {
    return this.stage[y][x];
  }

  /** Check if `(x,y)` falls withing the board */
  _isTile(x: number, y: number): boolean {
    if (x < 0 || this.width <= x) return false;
    if (y < 0 || this.height <= y) return false;
    return true;
  }
}
