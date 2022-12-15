import Person from "../../../../Data Patterns/Data Source/Data Mapper/Domain/Models/Person";
import IPerson from "../../../../Data Patterns/Data Source/Data Mapper/Domain/Models/IPerson";
import UnitOfWork from "../UnitOfWork";

/**
 * Proxy of "Person" model which registers its own changes in Unit of Work
 */
export default class PersonUow implements IPerson {
  public constructor(
    private readonly unitOfWork: UnitOfWork,
    private person: Person,
  ) {
    this.unitOfWork.registerCreated(this.person);
  }

  get id(): number {
    return this.person.id;
  }

  set id(id: number) {
    this.person.id = id;
  }

  public getEmail(): string {
    return this.person.getEmail();
  }

  public getFirstName(): string {
    return this.person.getFirstName();
  }

  public getLastName(): string {
    return this.person.getLastName();
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

  public delete(): void {
    this.unitOfWork.registerRemoved(this.person);
  }
}
