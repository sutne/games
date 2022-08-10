const LEADERBOARD_LENGTH = 5;

/** Only keep the best games */
export function getPersonalBest<T>(
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

/** Each user is limited to 1 entry on each leaderboard */
export function getLeaderboard<T>(
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
