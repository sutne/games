type block = {
  shape: string[][];
  color: string;
};
export const blocks: { [key: string]: block } = {
  0: { shape: [["0"]], color: "game.features.background" },
  I: {
    shape: [
      ["0", "I", "0", "0"],
      ["0", "I", "0", "0"],
      ["0", "I", "0", "0"],
      ["0", "I", "0", "0"],
    ],
    color: "game.colors.cyan",
  },
  L: {
    shape: [
      ["0", "L", "0"],
      ["0", "L", "0"],
      ["0", "L", "L"],
    ],
    color: "game.colors.orange",
  },
  J: {
    shape: [
      ["0", "J", "0"],
      ["0", "J", "0"],
      ["J", "J", "0"],
    ],
    color: "game.colors.blue",
  },
  O: {
    shape: [
      ["O", "O"],
      ["O", "O"],
    ],
    color: "game.colors.yellow",
  },
  S: {
    shape: [
      ["0", "S", "S"],
      ["S", "S", "0"],
      ["0", "0", "0"],
    ],
    color: "game.colors.green",
  },
  Z: {
    shape: [
      ["Z", "Z", "0"],
      ["0", "Z", "Z"],
      ["0", "0", "0"],
    ],
    color: "game.colors.red",
  },
  T: {
    shape: [
      ["0", "0", "0"],
      ["T", "T", "T"],
      ["0", "T", "0"],
    ],
    color: "game.colors.purple",
  },
};
