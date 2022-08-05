/** Convert a number of milliseconds to [minutes, seconds, hundredths] */
export function convertTime(time: number): [string, string, string] {
  const sec = 1000; // 1 sec = 1000 ms
  const minutes = Math.floor((time / (60 * sec)) % 60);
  const seconds = Math.floor((time / sec) % 60);
  const hundredths = Math.floor(time / (sec / 100));
  const m = `0${minutes}`.slice(-2);
  const s = `0${seconds}`.slice(-2);
  const h = `0${hundredths}`.slice(-2);
  return [m, s, h];
}
