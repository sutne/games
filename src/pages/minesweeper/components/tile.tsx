import { useTheme } from "@mui/material";
import { GameTile } from "../logic";
import { useGame } from "./game-provider";

import "./tile.css";

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
        onClick={(e) => {
          onLeftClick();
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          onRightClick();
        }}
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

  function onLeftClick() {
    if (game.isLost || game.isWon) return;
    let gameCopy = game.copy();
    gameCopy.checkIfWon();
    if (!isHidden) return;
    if (!gameCopy.hasInitializedBombs) gameCopy.initBombs(x, y);
    gameCopy.reveal(x, y);
    if (isBomb) {
      gameCopy.isLost = true;
      gameCopy.revealBombs();
    }
    setGame(gameCopy);
  }

  function onRightClick() {
    if (game.isLost || game.isWon) return;
    let gameCopy = game.copy();
    let tileCopy = gameCopy.getTile(x, y)!;
    if (!tileCopy.isHidden) return;
    tileCopy.isFlagged = !isFlagged;
    setGame(gameCopy);
  }

  function getContent() {
    if (isFlagged) return "🚩";
    if (isHidden) return "";
    if (isBomb) return "💣";
    if (numConnectedBombs !== 0) return numConnectedBombs;
    return "";
  }

  function getBackground() {
    if (isHidden && isFlagged && (game.isWon || game.isLost))
      return theme.game.colors.green;
    if (isHidden) return theme.game.features.obstacle;
    if (isBomb) return theme.game.colors.red;
    return "";
  }

  function getNumberColor() {
    if (numConnectedBombs === 8) return theme.game.colors.brown;
    if (numConnectedBombs === 7) return theme.game.colors.brown;
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
