import { IEntity } from "./IEntity";

/** Base entity for models connected to table which have ID */
export default abstract class Entity implements IEntity {
  private _id: number | null = null;

  get id(): number | null {
    return this._id;
  }

  set id(value: number | null) {
    this._id = value;
  }
}
