import Entity from "../../Dao/Entities/Entity";
import IPerson from "./IPerson";

export default class Person extends Entity implements IPerson {
  private firstName: string = '';
  private lastName: string = '';
  private email: string = '';

  public getFirstName(): string {
    return this.firstName;
  }

  public setFirstName(firstName: string): this {
    this.firstName = firstName;
    return this;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public setLastName(lastName: string): this {
    this.lastName = lastName;
    return this;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): this {
    this.email = email;
    return this;
  }
}
