import { Box } from "@material-ui/core";

import { Difficulty } from "./logic";
import { Board } from "./components/board";

export function Minesweeper() {
  const style = {
    boardContainer: {
      display: "flex",
      textAlign: "center",
      flexDirection: "column",
      justifyContent: "center",
      alignContent: "center",
      height: "100vh",
    },
  };

  return (
    <Box style={{ textAlign: "center" }}>
      <Box style={style.boardContainer}>
        <Board difficulty={Difficulty.TUTORIAL} />
      </Box>
    </Box>
  );
}
