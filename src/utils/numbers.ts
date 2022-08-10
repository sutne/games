/** Convert decimal number to percentage with given number of decimals */
export function toPercentageString(num: number, decimals = 0): string {
  return `${Number(100 * num).toFixed(decimals)}%`;
}
