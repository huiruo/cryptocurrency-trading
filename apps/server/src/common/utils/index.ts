export function formatTimestamp(
  timestamp: number,
  isAccurateToSecond = true,
): string {
  const date = new Date(timestamp)
  const y = date.getFullYear()
  const M = date.getMonth() + 1
  const d = date.getDate()
  const h = date.getHours()
  const m = date.getMinutes()
  const s = date.getSeconds()
  const dateStr = y + '-' + addZero(M) + '-' + addZero(d)
  if (isAccurateToSecond) {
    return dateStr + ' ' + addZero(h) + ':' + addZero(m) + ':' + addZero(s)
  } else {
    return dateStr
  }
}

function addZero(m: number): string | number {
  return m < 10 ? '0' + m : m
}
