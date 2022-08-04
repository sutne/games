/** Convert a time number where 100 = 1sec to [minutes, seconds, tenths] */
export function formatTime(time: number): [string, string, string] {
  const sec = 100;
  const minutes = Math.floor((time / (60 * sec)) % 60);
  const seconds = Math.floor((time / sec) % 60);
  const m = `0${minutes}`.slice(-2);
  const s = `0${seconds}`.slice(-2);
  const t = `0${time}`.slice(-1);
  return [m, s, t];
}
