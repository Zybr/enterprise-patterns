import { IEntity } from "../../Dao/Entities/IEntity";

export default interface IPerson extends IEntity {
  getFirstName(): string;

  setFirstName(firstName: string): this;

  getLastName(): string;

  setLastName(lastName: string): this;

  getEmail(): string;

  setEmail(email: string): this;
}
