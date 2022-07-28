import { Box } from "@material-ui/core";

import "./minesweeper.css";
import { Difficulty } from "./logic";
import { Board } from "./components/board";

export function Minesweeper() {
  return (
    <Box>
      <Box className="board-container">
        <Board difficulty={Difficulty.TUTORIAL} />
      </Box>
    </Box>
  );
}
