import { useTheme } from "@mui/material";
import { Tile } from "./tile";

import "./board.css";
import { useGame } from "./game-provider";

export function Board() {
  const theme = useTheme();
  const colors = {
    borderColor: theme.game.features.obstacle,
    background: theme.game.features.background,
  };

  const game = useGame()[0];
  return (
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
  );
}
