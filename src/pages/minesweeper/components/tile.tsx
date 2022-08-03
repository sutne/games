import { Box } from "@mui/material";
import { GameTile } from "../logic";
import { useGame } from "../hooks/GameProvider";

export function Tile(tile: GameTile) {
  const { x, y, isHidden, isBomb, isFlagged, numConnectedBombs } = tile;
  const [game, setGame] = useGame();

  const classes = getStyle({
    isHidden,
    isBomb,
    isFlagged,
    numConnectedBombs,
    gameOver: game.isLost || game.isWon,
  });

  const content = () => {
    if (isFlagged) return "🚩";
    if (isHidden) return "";
    if (isBomb) return "💣";
    if (numConnectedBombs !== 0) return numConnectedBombs;
    return "";
  };

  function onLeftClick(e: any) {
    if (!isHidden) return;
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
    if (!isHidden) return;
    e.preventDefault();
    if (game.isLost || game.isWon) return;
    let copy = game.copy();
    copy.toggleFlag(x, y);
    setGame(copy);
  }

  return (
    <Box sx={classes.tile} onClick={onLeftClick} onContextMenu={onRightClick}>
      {content()}
    </Box>
  );
}

//------------------------------------------------------------------------------

type StyleProps = {
  isHidden: boolean;
  isBomb: boolean;
  isFlagged: boolean;
  gameOver: boolean;
  numConnectedBombs: number;
};
function getStyle(props: StyleProps) {
  const { isHidden, isBomb, isFlagged, gameOver, numConnectedBombs } = props;
  let tileSize = "28pt";

  const background = () => {
    let correctFlag = gameOver && isFlagged && isBomb;
    if (correctFlag) return "game.colors.green";
    if (isHidden) return "game.features.obstacle";
    if (isBomb) return "game.colors.red";
    return "game.features.background";
  };
  const numberColor = () => {
    if (numConnectedBombs === 8) return "game.colors.black";
    if (numConnectedBombs === 7) return "game.colors.gray";
    if (numConnectedBombs === 6) return "game.colors.brown";
    if (numConnectedBombs === 5) return "game.colors.red";
    if (numConnectedBombs === 4) return "game.colors.orange";
    if (numConnectedBombs === 3) return "game.colors.yellow";
    if (numConnectedBombs === 2) return "game.colors.green";
    if (numConnectedBombs === 1) return "game.colors.blue";
    return "text.primary";
  };

  return {
    tile: [
      {
        position: "relative",
        fontSize: "20pt",
        fontWeight: "bold",
        height: tileSize,
        width: tileSize,
        backgroundColor: background(),
        color: numberColor(),
        /* Center content*/
        flex: "1px",
        display: "flex",
        textAlign: "center",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        /* Disable highlighting of the numbers */
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        KhtmlUserSelect: "none",
        MozUserSelect: "none",
        MsUserSelect: "none",
        userSelect: "none",
      },
      isHidden && {
        cursor: "pointer",
        "&:hover": {
          boxShadow: "inset 0 0 5px black",
        },
        "&:before": {
          position: "absolute",
          height: "100%",
          width: "100%",
          top: "0px",
          left: "0px",
          content: "''",
          zIndex: "-1",
          boxShadow: "0px 0px 5px 0px black",
        },
      },
      !isHidden && {
        zIndex: "-2",
        cursor: "default",
      },
    ],
  } as const;
}
