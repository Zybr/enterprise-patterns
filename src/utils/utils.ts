/** Convert date to database format */
export const dateToDbString = (date: Date): string => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

export const dbStringToDate = (dateString: string): Date => new Date(Date.parse(dateString));

interface callable {
  (...args: any[]): any
}

export const handlePromiseError = (reject: callable, err?: Error | null) => {
  if (err) {
    reject(err);
  }
}

export const camelCaseToUnderscore = (attr: string): string => {
  return attr.split(/\.?(?=[A-Z])/).join('_').toLowerCase();
}
