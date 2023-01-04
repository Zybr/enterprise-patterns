const {v4: uuidv4} = require('uuid');

/** Convert date to database format */
export const dateToDbString = (date: Date): string => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

export const dbStringToDate = (dateString: string): Date => new Date(Date.parse(dateString));

export const dateTimeToDbString = (date: Date): string =>
  `${date.getFullYear()}`
  + `-${('' + date.getMonth() + 1).padStart(2, '0')}`
  + `-${('' + date.getDate()).padStart(2, '0')}`
  + ` ${('' + date.getHours()).padStart(2, '0')}`
  + `:${('' + date.getMinutes()).padStart(2, '0')}`
  + `:${('' + date.getSeconds()).padStart(2, '0')}`;

export const dbStringToDateTime = (dateTimeString: string): Date => new Date(Date.parse(dateTimeString));

export interface callable {
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

export const generateUid = (): string => uuidv4();
