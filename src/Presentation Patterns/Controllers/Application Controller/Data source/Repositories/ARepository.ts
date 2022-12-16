import { IEntity } from "../../../../../Data Patterns/Data Source/Data Mapper/Dao/Entities/IEntity";

export default abstract class ARepository<E extends IEntity> {
  public abstract find(id: number): Promise<E | null>

  public findOrFail(id: number): Promise<E> {
    return this.find(id)
      .then(person => {
        if (!person) {
          throw new Error(`There is not a model with ID ${id}`);
        }
        return person;
      })
  }
}
