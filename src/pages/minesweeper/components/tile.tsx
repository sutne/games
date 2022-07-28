import { useTheme } from "@mui/material";
import { useState } from "react";
import { GameTile } from "../logic";

import "./tile.css";

type TileProps = {
  tile: GameTile;
  playingTutorial: boolean;
  hasLost: boolean;
  hasWon: boolean;
  onLeftClick: (x: number, y: number) => void;
  onRightClick: (x: number, y: number) => void;
};

// Tile handles only appearance, all state is handled by the Board
export function Tile(props: TileProps) {
  const [hover, setHover] = useState(false);
  const theme = useTheme();

  const onLeftClick = (e: any) => {
    props.onLeftClick(props.tile.x, props.tile.y);
  };

  const onRightClick = (e: any) => {
    e.preventDefault();
    props.onRightClick(props.tile.x, props.tile.y);
  };

  const color = () => {
    if (props.hasWon && props.tile.isBomb && props.tile.isFlagged)
      return theme.game.green;
    if (props.tile.isHidden) {
      if (hover && props.playingTutorial && props.tile.isBomb) {
        return theme.game.red;
      }
      return theme.game.black;
    }
    if (props.tile.isBomb && props.hasWon) return theme.game.black;
    if (props.tile.isBomb && !props.tile.isFlagged) return theme.game.red;
    return "";
  };

  const textColor = () => {
    switch (props.tile.connectedBombs) {
      case 8:
        return theme.game.brown;
      case 7:
        return theme.game.brown;
      case 6:
        return theme.game.brown;
      case 5:
        return theme.game.red;
      case 4:
        return theme.game.orange;
      case 3:
        return theme.game.yellow;
      case 2:
        return theme.game.green;
      case 1:
        return theme.game.blue;
      default:
        return theme.palette.text.primary;
    }
  };

  const getContent = () => {
    if (props.tile.isFlagged) return "🚩";
    if (props.tile.isBomb) return "💣";
    if (props.tile.connectedBombs !== 0) return props.tile.connectedBombs;
    return "";
  };

  const showContent = () => {
    const content = getContent();
    if (props.tile.isBomb && props.hasWon) return content;
    if (props.tile.isFlagged) return content;
    if (props.playingTutorial && hover) return content;
    if (props.tile.isHidden) return "";
    return content;
  };

  const colors = {
    background: color(),
    color: textColor(),
  };

  return (
    <div
      className={`sweeper-tile ${
        props.tile.isHidden || props.tile.isFlagged ? "hidden" : ""
      }`}
      style={colors}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onLeftClick}
      onContextMenu={onRightClick}
    >
      {showContent()}
    </div>
  );
}
