import { PersonRowDataGateway } from "../PersonRowDataGateway";

/**
 * An example how Row Data Gateway can be connected to Domain layer
 */
export class Person {
  private row: PersonRowDataGateway;

  public constructor(row: PersonRowDataGateway) {
    this.row = row;
  }

  public getId(): number | null {
    return this.row.getId();
  }

  public setFirstName(firstName: string): this {
    this.row.setFirstName(firstName);
    return this;
  }

  public getFirstName(): string {
    return this.row.getFirstName();
  }


  public setLastName(lastName: string): this {
    this.row.setLastName(lastName);
    return this;
  }

  public getLastName(): string {
    return this.row.getLastName();
  }


  public setEmail(email: string): this {
    this.row.setEmail(email);
    return this;
  }

  public getEmail(): string {
    return this.row.getEmail();
  }

  /**
   * Add business logic here
   */
}
