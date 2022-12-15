import { IEntity } from "../../../Data Patterns/Data Source/Data Mapper/Dao/Entities/IEntity";

export default class IdentityMap {
  private entities: {
    [key: string]: IEntity
  } = {}

  public find(type: string, id: number): IEntity | null {
    return this.entities[this.makeTypeKey(type, id)] ?? null;
  }

  public add(entity: IEntity): void {
    this.entities[this.makeEntityKey(entity)] = entity;
  }

  private makeEntityKey(entity: IEntity): string {
    if (entity.id === null) {
      throw new Error('Entity ID is not defined.')
    }

    return this.makeTypeKey(entity.constructor.name, entity.id);
  }

  private makeTypeKey(type: string, id: number): string {
    return `${type}#${id}`;
  }
}
