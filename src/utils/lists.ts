const LEADERBOARD_LENGTH = 5;

/**
 * @param list list to insert into (in place)
 * @param index index of insertion
 * @param item item to insert
 */
export function insert<T>(list: T[], index: number, item: T) {
  list.splice(index, 0, item);
}
/**
 * @param list list to remove from (in place)
 * @param index index to remove item at
 */
export function remove<T>(list: T[], index: number) {
  list.splice(index, 1);
}
/**
 * @param list list to replace an item in (in place)
 * @param index index of item to replace
 * @param item item to insert at index
 */
export function replace<T>(list: T[], index: number, item: T) {
  list.splice(index, 1, item);
}

/**
 * @param list current (old) list of best games
 * @param newEntry the new entry to (maybe) insert
 * @param firstIsBest function that returns true if first argument (`A`)
 * should be before the second argument (`B`) in the list.
 * @returns The updated list of personal best games
 */
export function updatePersonalBestList<T>(
  list: T[],
  newEntry: T,
  firstIsBest: (A: T, B: T) => boolean,
): T[] {
  let inserted = false;
  for (let i = 0; i < list.length; i++) {
    if (firstIsBest(list[i], newEntry)) continue;
    // newEntry is better than the leaderboard entry
    // insert (not replace) so list can grow in length
    insert(list, i, newEntry);
    inserted = true;
    break;
  }
  if (!inserted && list.length < LEADERBOARD_LENGTH) {
    list.push(newEntry);
  }
  // if list is now longer than allowed length, only return the top
  return list.slice(0, LEADERBOARD_LENGTH);
}

export interface Entry {
  user: string;
}
/**
 * @param list current (old) leaderboard
 * @param newEntry the new entry to (maybe) insert
 * @param username the name of the user that played the game
 * @param firstIsBest function that returns true if first argument (`A`)
 * should be on top of the second argument (`B`) in the leaderboard.
 * @returns The updated leaderboard
 */
export function updateLeaderboardList<T extends Entry>(
  list: T[],
  newEntry: T,
  username: string,
  firstIsBest: (A: T, B: T) => boolean,
): T[] {
  // If user already has entry on the leaderboard
  // we want to replace it (if it is better of course)
  let inserted = false;
  for (let i = 0; i < list.length; i++) {
    if (!inserted) {
      if (firstIsBest(list[i], newEntry)) {
        // don't insert, leaderboard item is better
        // if an entry is by the user but better than the new one
        // we simply return the original leaderboard
        if (list[i].user === username) return list;
      } else {
        // insert new entry at index i
        insert(list, i, newEntry);
        inserted = true;
      }
    } else {
      // there is now an entry for the user earlier in the leaderboard
      // so we have to remove any other entries by this user
      if (list[i].user === username) remove(list, i);
    }
  }
  // item isn't better than any in list, but there might still be room left
  if (!inserted && list.length < LEADERBOARD_LENGTH) {
    list.push(newEntry);
  }
  // console.log("after", { list });
  //in case the leaderboard has grown, return only the top elements
  return list.slice(0, LEADERBOARD_LENGTH);
}
