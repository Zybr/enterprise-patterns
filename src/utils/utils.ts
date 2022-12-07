/** Convert date to database format */
export const dateToDatabase = (date: Date): string => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

interface callable {
  (...any): any
}

export const handlePromiseError = (reject: callable, err?: Error) => {
  if (err) {
    reject(err);
  }
}

export const camelCaseToUnderscore = (attr: string): string => {
  return attr.split(/\.?(?=[A-Z])/).join('_').toLowerCase();
}
