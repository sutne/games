import { Button, Typography, useTheme } from "@mui/material";
import { Tile } from "./Tile";

import "./Board.css";
import { useGame } from "../hooks/GameProvider";

export function Board() {
  const theme = useTheme();
  const colors = {
    borderColor: theme.palette.game.features.obstacle,
    background: theme.palette.game.features.background,
  };

  const [game, setGame] = useGame();
  return (
    <>
      <table className="sweeper-table" style={colors}>
        <tbody>
          {game.board.map((row, r) => (
            <tr key={r} className="sweeper-row">
              {row.map((tile) => (
                <td key={tile.y * game.width + tile.x} className="sweeper-cell">
                  <Tile {...tile} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
