export function getCountdown(startTime: string) {
  const targetDate = new Date(startTime);
  const now = new Date();

  if (isNaN(targetDate.getTime())) {
    console.error("Invalid date format:", startTime);
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const diffMs = Math.max(targetDate.getTime() - now.getTime(), 0); // Evita valores negativos

  const oneSecond = 1000;
  const oneMinute = oneSecond * 60;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;

  const days = Math.floor(diffMs / oneDay);
  const hours = Math.floor((diffMs % oneDay) / oneHour);
  const minutes = Math.floor((diffMs % oneHour) / oneMinute);
  const seconds = Math.floor((diffMs % oneMinute) / oneSecond);

  return { days, hours, minutes, seconds };
}
