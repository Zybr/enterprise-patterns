import BaseEntity from "../entities/base-entity";
import { EntityRepository } from "@mikro-orm/sqlite";
import { RequiredEntityData } from "@mikro-orm/core";

export default abstract class Service<E extends BaseEntity> {
  protected readonly repository: EntityRepository<E>;

  public create(createDto: RequiredEntityData<E>): Promise<E> {
    const entity = this.repository.create(createDto)
    return this.repository
      .flush()
      .then(() => entity);
  }

  public findAll(): Promise<E[]> {
    return this.repository.findAll();
  }

  public findOne(id: number): Promise<E | null> {
    return this.repository.findOne({id} as any);
  }

  public update(id: number, updateDto: RequiredEntityData<E>): Promise<E> {
    return this.findOne(id)
      .then(entity => {
        if (!entity) {
          throw new Error(`Entity with ${id} was not defined`);
        }

        return entity
      })
      .then(entity => Object.assign(entity, updateDto))
      .then(entity => this.repository.persistAndFlush(entity))
      .then(() => this.repository.findOne({id} as any));
  }

  public remove(id: number): Promise<void> {
    return new Promise(
      resolve => this.repository
        .findOne({id} as any)
        .then(entity => entity ? resolve(this.repository.removeAndFlush(entity)) : resolve())
    );
  }
}

