import { useTheme } from "@material-ui/core";
import { useState } from "react";

import "./tile.css";

type TileProps = {
  x: number;
  y: number;
  connectedBombs: number;
  isBomb: boolean;
  isHidden: boolean;
  isFlagged: boolean;
  playingTutorial: boolean;
  onLeftClick: (x: number, y: number) => void;
  onRightClick: (x: number, y: number) => void;
};

// Tile handles only appearance, all state is handled by the Board
export function Tile(props: TileProps) {
  const [hover, setHover] = useState(false);
  const theme = useTheme();

  const onLeftClick = (e: any) => {
    props.onLeftClick(props.x, props.y);
  };

  const onRightClick = (e: any) => {
    e.preventDefault();
    props.onRightClick(props.x, props.y);
  };

  const color = () => {
    if (props.isHidden) return theme.game.black;
    if (props.isBomb) return theme.game.red;
    return theme.game.gray;
  };

  const textColor = () => {
    switch (props.connectedBombs) {
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
    if (props.isFlagged) return "🚩";
    if (props.isBomb) return "💣";
    if (props.connectedBombs !== 0) return props.connectedBombs;
    return "";
  };

  const showContent = () => {
    const content = getContent();
    if (props.isFlagged) return content;
    if (props.playingTutorial && hover) return content;
    if (props.isHidden) return "";
    return content;
  };

  const colors = {
    background: color(),
    color: textColor(),
  };

  return (
    <div
      className="sweeper-tile"
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
