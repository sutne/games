const LEADERBOARD_LENGTH = 5;

export function getTopList<T>(
  list: T[],
  newItem: T,
  comparator: (A: T, B: T) => 1 | -1
): T[] {
  // add to list
  list.push(newItem);
  // sort it with custom function
  list.sort(comparator);
  // only keep top
  return list.slice(0, LEADERBOARD_LENGTH);
}
