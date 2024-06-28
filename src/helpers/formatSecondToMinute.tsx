export function formatSecondToMinute(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const second = Math.floor(seconds % 60)
  const formatMinute = minutes.toString().padStart(2, "0");
  const formatSecond = second.toString().padStart(2, "0")
  return `${formatMinute}:${formatSecond}`
}
