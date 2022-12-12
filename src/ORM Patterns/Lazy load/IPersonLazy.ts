/**
 * (!) Typical IPromise can't be used for Lazy Load patterns since DB operation are promises
 * (getFirstName(): Promise<string> !== getFirstName(): string)
 */
export default interface IPersonLazy {
  get id(): number;

  getFirstName(): Promise<string>;

  getLastName(): Promise<string>;

  getEmail(): Promise<string | null>;

  setEmail(email: string): this;

  setFirstName(firstName: string): this;

  setLastName(lastName: string): this;
}
