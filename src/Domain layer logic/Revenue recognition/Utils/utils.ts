/** Convert date to database format */
export const dateToDatabase = (date: Date): string => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

export const handlePromiseError = (reject, err?: Error) => {
  if (err) {
    reject(err);
  }
}

/** Define how much days passed since the date */
export const getPassedDays = (date: Date): number => Math.ceil(
  (new Date().getTime() - date.getTime())
  / (1000 * 60 * 60 * 24)
);
