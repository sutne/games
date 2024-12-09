/** Convert a number of milliseconds to [minutes, seconds, hundredths] */
function convertTime(time: number): [string, string, string, string] {
  const sec = 1000; // 1 sec = 1000 ms
  const hours = Math.floor((time / (60 * 60 * sec)) % 60);
  const minutes = Math.floor((time / (60 * sec)) % 60);
  const seconds = Math.floor((time / sec) % 60);
  const hundredths = Math.floor(time / (sec / 100));
  const h = `0${hours}`.slice(-2);
  const m = `0${minutes}`.slice(-2);
  const s = `0${seconds}`.slice(-2);
  const hs = `0${hundredths}`.slice(-2);
  return [h, m, s, hs];
}

export function timeString(time: number) {
  const [h, m, s, hs] = convertTime(time);
  if (h === '00' && m === '00') return `${s}.${hs}s`;
  if (h === '00') return `${m}:${s}`;
  return `${h}:${m}:${s}`;
}
