import EntityManager from "../../Data Patterns/Data Source/Data Mapper/Dao/Managers/EntityManager";
import PropsSet from "../../Data Patterns/Data Source/Data Mapper/Dao/Entities/PropsSet";
import { IEntity } from "../../Data Patterns/Data Source/Data Mapper/Dao/Entities/IEntity";

/**
 * TODO: Not clear what the aim of "registerClean" method
 */
export default class UnitOfWork {
  private created: IEntity[] = [];
  private update: IEntity[] = [];
  private removed: IEntity[] = [];

  public constructor(
    private entityManagers: {
      [key: string]: EntityManager<IEntity | PropsSet, PropsSet>
    }
  ) {
  }

  public registerCreated(entity: IEntity): this {
    if (entity.id !== null) {
      throw new Error('Model is already created.');
    }

    this.created.push(entity);

    return this;
  }

  public registerUpdated(entity: IEntity): this {
    if (entity.id === null) {
      throw new Error('Model is not created.');
    }

    this.update.push(entity);

    return this;
  }

  public registerRemoved(entity: IEntity): this {
    this.removed.push(entity);

    return this;
  }

  public commit(): Promise<null> {
    this.syncRegisters();
    // TODO: Wrap in transaction. DB library doesn't allow to open transaction without explicitly using SQL.
    return Promise.all(
      [
        ...[
          ...this.created,
          ...this.update,
        ].map(
          entity => this.getEntityManager(entity).save(entity)
        ),
        ...this.removed.map(
          entity => this.getEntityManager(entity).delete(entity)
        )
      ]
    )
      .then(() => this.cleanRegisters())
      .then(() => null)
  }

  private getEntityManager(entity: IEntity): EntityManager<IEntity | PropsSet, PropsSet> {
    const entityType = entity.constructor.name;

    if (!this.entityManagers[entityType]) {
      throw new Error(`Entity manager of "${entityType}" is not defined`);
    }

    return this.entityManagers[entityType];
  }

  private cleanRegisters(): void {
    this.created = [];
    this.update = [];
    this.removed = [];
  }

  private syncRegisters(): void {
    this.created = this.created.filter(entity => !this.removed.includes(entity));
    this.update = this.update.filter(entity => !this.removed.includes(entity) && !this.created.includes(entity));
  }
}
