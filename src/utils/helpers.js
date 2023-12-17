// Add helpers here. This is usually code that is just JS and not React code. Example: write a function that
// calculates number of minutes when passed in seconds. Things of this nature that you don't want to copy/paste
// everywhere.
export function getMinutes(totalSeconds) {
  if (totalSeconds === undefined) {
    return 0;
  }
  return Math.floor(totalSeconds / 60);
}

export function getSeconds(totalSeconds) {
  if (totalSeconds === undefined) {
    return 0;
  }
  return totalSeconds;
}

export function getTotalSeconds(minutes, seconds) {
  if (minutes === undefined) {
    minutes = 0;
  }
  if (seconds === undefined) {
    seconds = 0;
  }
  return minutes * 60 + seconds;
}