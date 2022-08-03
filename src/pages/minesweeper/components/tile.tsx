import { useTheme } from "@mui/material";
import { GameTile } from "../logic";
import { useGame } from "../hooks/GameProvider";

import "./Tile.css";

export function Tile({
  x,
  y,
  isHidden,
  isBomb,
  isFlagged,
  numConnectedBombs,
}: GameTile) {
  const [game, setGame] = useGame();
  const theme = useTheme();

  const style = {
    color: getNumberColor(),
    background: getBackground(),
  };

  function Hidden() {
    return (
      <div
        className="tile-hidden"
        style={style}
        onClick={onLeftClick}
        onContextMenu={onRightClick}
      >
        {getContent()}
      </div>
    );
  }

  function Revealed() {
    return (
      <div className="tile-revealed" style={style}>
        {getContent()}
      </div>
    );
  }

  function onLeftClick(e: any) {
    if (game.isLost || game.isWon) return;
    if (isFlagged) return;

    let copy = game.copy();
    if (!copy.hasInitializedBombs) copy.initBombs(x, y);
    copy.reveal(x, y);
    if (isBomb) {
      copy.revealBombs();
      copy.isLost = true;
    }
    copy.checkIfWon();

    setGame(copy);
  }

  function onRightClick(e: any) {
    e.preventDefault();
    if (game.isLost || game.isWon) return;
    let copy = game.copy();
    copy.toggleFlag(x, y);
    setGame(copy);
  }

  function getContent() {
    if (isFlagged) return "🚩";
    if (isHidden) return "";
    if (isBomb) return "💣";
    if (numConnectedBombs !== 0) return numConnectedBombs;
    return "";
  }

  function getBackground() {
    let correctFlag = (game.isWon || game.isLost) && isFlagged && isBomb;
    if (correctFlag) return theme.game.colors.green;
    if (isHidden) return theme.game.features.obstacle;
    if (isBomb) return theme.game.colors.red;
    return theme.game.features.background;
  }

  function getNumberColor() {
    if (numConnectedBombs === 8) return theme.game.colors.black;
    if (numConnectedBombs === 7) return theme.game.colors.gray;
    if (numConnectedBombs === 6) return theme.game.colors.brown;
    if (numConnectedBombs === 5) return theme.game.colors.red;
    if (numConnectedBombs === 4) return theme.game.colors.orange;
    if (numConnectedBombs === 3) return theme.game.colors.yellow;
    if (numConnectedBombs === 2) return theme.game.colors.green;
    if (numConnectedBombs === 1) return theme.game.colors.blue;
    return theme.palette.text.primary;
  }

  if (isHidden) {
    return <Hidden />;
  } else {
    return <Revealed />;
  }
}
