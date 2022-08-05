export function toPercentageString(num: number, decimals = 0): string {
  return `${Number(num).toFixed(decimals)}%`;
}
