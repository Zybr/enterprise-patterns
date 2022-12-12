import { IEntity } from "../../Dao/Entities/IEntity";

export default interface IPerson extends IEntity {
  getFirstName(): string | null;

  setFirstName(firstName: string): this | null;

  getLastName(): string | null;

  setLastName(lastName: string): this | null;

  getEmail(): string | null;

  setEmail(email: string): this | null;
}
