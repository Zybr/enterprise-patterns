import IPerson from "../../../../Data Patterns/Data Source/Data Mapper/Domain/Models/IPerson";
import IPersonLazy from "../IPersonLazy";
import FieldFetcher from "../FieldFetcher";

export default class PersonLazyInit implements IPersonLazy {
  public constructor(
    private readonly fetcher: FieldFetcher,
    private person: IPerson,
  ) {
    if (person.id === null) {
      throw new Error('Entity is not stored.');
    }
  }

  public get id(): number {
    return this.person.id;
  }

  public async getFirstName(): Promise<string> {
    if (this.person.getFirstName() === null) {
      this.person.setFirstName(await this.fetcher.getField('persons', this.id, 'first_name'));
    }

    return Promise.resolve(this.person.getFirstName());
  }

  public async getLastName(): Promise<string> {
    if (this.person.getLastName() === null) {
      this.person.setLastName(await this.fetcher.getField('persons', this.id, 'last_name'));
    }

    return Promise.resolve(this.person.getLastName());
  }

  public async getEmail(): Promise<string> {
    if (this.person.getEmail() === null) {
      await this.fetcher
        .getField('persons', this.id, 'email_id')
        .then(
          emailId => this.fetcher
            .getField('emails', parseInt(emailId), 'mail')
        )
        .then(email => this.person.setEmail(email))
    }

    return Promise.resolve(this.person.getEmail());
  }

  public setEmail(email: string): this {
    this.person.setEmail(email);

    return this;
  }

  public setFirstName(firstName: string): this {
    this.person.setFirstName(firstName);

    return this;
  }

  public setLastName(lastName: string): this {
    this.person.setLastName(lastName);

    return this;
  }
}
