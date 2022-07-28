import { useTheme } from "@mui/material";
import { useState } from "react";
import { Difficulty, Game } from "../logic";
import { Tile } from "./tile";

import "./board.css";

export type propsBoard = {
  difficulty: Difficulty;
};

export function Board(props: propsBoard) {
  const [game, updateGame] = useState(new Game(props.difficulty));

  function onTileLeftClick(x: number, y: number) {
    if (game.hasLost || game.hasWon()) return;
    let gameCopy = game.copy();
    const tile = gameCopy.getTile(x, y)!;
    if (tile.isFlagged) return;
    if (!tile.isHidden) return;
    if (!gameCopy.hasInitializedBombs) gameCopy.initBombs(tile);
    gameCopy.reveal(tile);
    if (tile.isBomb) gameCopy.revealBombs();
    updateGame(gameCopy);
  }

  function onTileRightClick(x: number, y: number) {
    if (game.hasLost || game.hasWon()) return;
    let gameCopy = game.copy();
    const tile = gameCopy.getTile(x, y)!;
    if (!tile.isHidden) return;
    tile.isFlagged = !tile.isFlagged;
    updateGame(gameCopy);
  }

  const theme = useTheme();
  const colors = {
    borderColor: theme.game.gray,
  };

  return (
    <table className="sweeper-table" style={colors}>
      <tbody>
        {game.board.map((row, i) => (
          <tr key={i} className="sweeper-row">
            {row.map((tile, i) => (
              <td key={i} className="sweeper-cell">
                <Tile
                  {...tile}
                  onLeftClick={onTileLeftClick}
                  onRightClick={onTileRightClick}
                  playingTutorial={game.difficulty === Difficulty.TUTORIAL}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
