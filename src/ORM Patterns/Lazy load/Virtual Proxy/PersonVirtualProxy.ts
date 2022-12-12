import IPersonLazy from "../IPersonLazy";
import IPerson from "../../../Data Patterns/Data Source/Data Mapper/Domain/Models/IPerson";
import PersonManager from "../../../Data Patterns/Data Source/Data Mapper/Dao/Managers/PersonManager";

export default class PersonVirtualProxy implements IPersonLazy {
  private readonly _id: number
  private person: IPerson | null = null;

  public constructor(
    private readonly manager: PersonManager,
    id: number,
  ) {
    this._id = id;
  }

  get id(): number {
    return this._id;
  }

  getFirstName(): Promise<string> {
    return this
      .load()
      .then(person => person.getFirstName());
  }

  getLastName(): Promise<string> {
    return this
      .load()
      .then(person => person.getLastName());
  }

  getEmail(): Promise<string | null> {
    return this
      .load()
      .then(person => person.getEmail());
  }

  /**
   * Setters could return a Promise, but it's not critical for the patter.
   */

  setFirstName(firstName: string): this {
    this.load()
      .then(() => this.person.setFirstName(firstName));

    return this;
  }

  setLastName(lastName: string): this {
    this.load()
      .then(() => this.person.setLastName(lastName));

    return this;
  }

  setEmail(email: string): this {
    this.load()
      .then(() => this.person.setLastName(email));

    return this;
  }


  private load(): Promise<IPerson> {
    if (this.person !== null) {
      return Promise.resolve(this.person);
    }

    return this.manager
      .find(this.id)
      .then(person => this.person = person)
      .then(person => {
        if (!person) {
          throw new Error(`Person by ${this.id} is not defined.`);
        }
        return person;
      })
  }
}
