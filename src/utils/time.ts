/** Convert a time number where 100 = 1sec to [minutes, seconds, tenths] */
export function formatTime(time: number): [string, string, string] {
  let sec = 100;
  let minutes = Math.floor((time / (60 * sec)) % 60);
  let seconds = Math.floor((time / sec) % 60);
  let m = `0${minutes}`.slice(-2);
  let s = `0${seconds}`.slice(-2);
  let t = `0${time}`.slice(-1);
  return [m, s, t];
}
