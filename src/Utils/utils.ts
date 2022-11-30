/** Convert date to database format */
export const dateToDatabase = (date: Date): string => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

export const handlePromiseError = (reject, err?: Error) => {
  if (err) {
    reject(err);
  }
}

