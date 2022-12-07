export default class Person {
  private _id: number | null;
  private _firstName: string;
  private _lastName: string;
  private _year: number | null = null

  get id(): number | null {
    return this._id;
  }

  set id(value: number | null) {
    this._id = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get year(): number | null {
    return this._year;
  }

  set year(value: number | null) {
    this._year = value;
  }

  public constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
