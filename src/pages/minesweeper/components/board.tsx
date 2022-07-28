import { useTheme } from "@material-ui/core";
import { useState } from "react";
import { Difficulty, Game } from "../logic";
import { Tile } from "./tile";

export function Board(props) {
  const theme = useTheme();
  const [game, updateGame] = useState(new Game(props.difficulty));

  function onTileLeftClick(x, y) {
    if (game.hasLost || game.hasWon()) return;
    let gameCopy = game.copy();
    const tile = gameCopy.getTile(x, y);
    if (tile.isFlagged) return;
    if (!tile.isHidden) return;
    if (!gameCopy.hasInitializedBombs) gameCopy.initBombs(tile);
    gameCopy.reveal(tile);
    if (tile.isBomb) gameCopy.revealBombs();
    updateGame(gameCopy);
  }

  function onTileRightClick(x, y) {
    if (game.hasLost || game.hasWon()) return;
    let gameCopy = game.copy();
    const tile = gameCopy.getTile(x, y);
    if (!tile.isHidden) return;
    tile.isFlagged = !tile.isFlagged;
    updateGame(gameCopy);
  }

  const style = {
    table: {
      borderSpacing: 0,
      padding: 0,
      marginLeft: "auto",
      marginRight: "auto",
      border: `6px solid ${theme.palette.game.black}`,
      boxShadow: "0 0 12px 12px rgba(0,0,0,0.2)",
    },
    tile: {
      borderSpacing: 0,
      border: 0,
      padding: 0,
    },
  };

  return (
    <table style={style.table}>
      <tbody>
        {game.board.map((row, i) => (
          <tr key={i} style={style.tile}>
            {row.map((tile, i) => (
              <td key={i} style={style.tile}>
                <Tile
                  {...tile}
                  shadowDirections={game.getShadowDirections(tile)}
                  onLeftClick={onTileLeftClick}
                  onRightClick={onTileRightClick}
                  isTutorial={game.difficulty === Difficulty.TUTORIAL}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
