export {
  makeDate,
  getHours
}

const MILE_SECONDS_IN_HOUR = 60 * 60 * 1000;

const makeDate = (hours: number): Date => {
  const date = new Date();
  date.setTime(date.getTime() + hours * MILE_SECONDS_IN_HOUR);
  return date;
}

const getHours = (date: Date): number => date.getTime() / MILE_SECONDS_IN_HOUR;

