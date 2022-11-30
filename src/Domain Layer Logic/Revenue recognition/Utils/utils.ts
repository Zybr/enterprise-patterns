/** Define how much days passed since the date */
export const getPassedDays = (date: Date): number => Math.ceil(
  (new Date().getTime() - date.getTime())
  / (1000 * 60 * 60 * 24)
);
