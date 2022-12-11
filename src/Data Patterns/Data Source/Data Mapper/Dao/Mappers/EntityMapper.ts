import PropsSet from "../Entities/PropsSet";
import { IEntity } from "../Entities/IEntity";

export default abstract class EntityMapper<E extends IEntity | PropsSet, P extends PropsSet> {
  public abstract mapEntity(entity: E, propsSet: P): E

  public abstract makePropsSet(entity: E): P

  public abstract getTableName(): string;

  public abstract getColumnsNames(): string[]

  /** Values method */

  protected isInt(value: any): boolean {
    return Number.isInteger(value);
  }

  protected isString(value: any): boolean {
    return typeof value === "string";
  }
}
