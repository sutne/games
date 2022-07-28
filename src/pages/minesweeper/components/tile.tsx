import { useTheme } from "@material-ui/core";
import { useState } from "react";
import { Direction } from "../logic";

// Tile handles only appearance, all state is handled by the Board
export function Tile(props) {
  const [hover, setHover] = useState(false);
  const theme = useTheme();

  const onLeftClick = (e) => {
    props.onLeftClick(props.x, props.y);
  };

  const onRightClick = (e) => {
    e.preventDefault();
    props.onRightClick(props.x, props.y);
  };

  const color = () => {
    if (props.isHidden) return theme.palette.game.black;
    if (props.isBomb) return theme.palette.game.red;
    return theme.palette.game.gray;
  };

  const textColor = () => {
    switch (props.connectedBombs) {
      case 8:
        return theme.palette.game.brown;
      case 7:
        return theme.palette.game.brown;
      case 6:
        return theme.palette.game.brown;
      case 5:
        return theme.palette.game.red;
      case 4:
        return theme.palette.game.orange;
      case 3:
        return theme.palette.game.yellow;
      case 2:
        return theme.palette.game.green;
      case 1:
        return theme.palette.game.blue;
      default:
        return theme.palette.myText;
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
    if (props.isTutorial && hover) return content;
    if (props.isHidden) return "";
    return content;
  };

  let style = getStyle({ ...props, theme: theme, size: 42, hover: hover });
  style.color = textColor();
  style.backgroundColor = color();

  return (
    <div
      style={style}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onLeftClick}
      onContextMenu={onRightClick}
    >
      {showContent()}
    </div>
  );
}

function getStyle(props) {
  return {
    height: props.size,
    width: props.size,
    flex: 1,
    display: "flex",
    textAlign: "center",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    fontSize: 22,
    fontWeight: "bold",
    ...{
      // Hover
      zIndex: props.hover ? "-1" : "auto",
    },
    ...{
      // Disable highlighting of the numbers, and make cursor be pointer
      cursor: "pointer",
      WebkitTouchCallout: "none",
      WebkitUserSelect: "none",
      KhtmlUserSelect: "none",
      MozUserSelect: "none",
      MsUserSelect: "none",
      userSelect: "none",
    },
    "&:before": {
      // https://blog.dudak.me/2014/css-shadows-under-adjacent-elements/
      // fix by adding pseudo element below actual tile that casts the shadow,
      // that way shadow wont be cast on other hidden(elevated) tiles
      content: "",
      position: "absolute",
      top: "0",
      bottom: "0",
      left: "0",
      right: "0",
      zIndex: "-1",
      boxShadow: "-5px 5px 20px 5px #000",
    },
  };
}
