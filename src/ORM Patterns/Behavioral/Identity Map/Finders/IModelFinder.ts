import { IEntity } from "../../../../Data Patterns/Data Source/Data Mapper/Dao/Entities/IEntity";

export default interface IModelFinder {
  find(id: number): Promise<IEntity>
}
