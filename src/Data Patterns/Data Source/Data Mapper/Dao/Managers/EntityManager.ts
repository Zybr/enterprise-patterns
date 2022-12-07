import Entity from "../Entities/Entity";
import PropsSet from "../Entities/PropsSet";
import { Database } from "sqlite3"
import { handlePromiseError } from "../../../../../utils/utils";
import EntityMapper from "../Mappers/EntityMapper";

export default abstract class EntityManager<E extends (Entity | PropsSet), P extends PropsSet> {
  public readonly db: Database
  public readonly mapper: EntityMapper<E, P>

  public constructor(db: Database, mapper: EntityMapper<E, P>) {
    this.db = db;
    this.mapper = mapper;
  }

  public find(id: number): Promise<E | null> {
    return this.findBy({id})
      /** TODO: Use LIMIT */
      .then((entities: E[]) => entities[0] || null)
  }

  public findAll(): Promise<E[]> {
    return this.findBy({});
  }

  public findBy(filter: PropsSet): Promise<E[]> {
    return this.selectBy(filter)
      .then(
        (rows) => Promise.all(
          rows
            .map(row => this.mapEntity(
              this.makeEntity(),
              row
            ))
        )
      );
  };

  public save(entity: E): Promise<E> {
    return (
      (entity.id === null)
        ? this.create(this.mapper.makePropsSet(entity))
        : this.update(this.mapper.makePropsSet(entity))
    )
      .then((propsSet) => this.mapEntity(entity, propsSet));
  }

  public delete(entity: E): Promise<boolean> {
    if (entity.id === null) {
      return Promise.resolve(false);
    }

    const table = this.mapper.getTableName();

    return new Promise((resolve, reject) => this.db.run(
      `DELETE
       FROM ${table}
       WHERE id = ?`,
      [entity.id],
      function(err) {
        handlePromiseError(reject, err);
        resolve(this.changes > 0);
      }
    ));
  }

  protected abstract makeEntity(): E;

  protected mapEntity(entity: E, propsSet: P): Promise<E> {
    return Promise.resolve(this.mapper.mapEntity(entity, propsSet));
  }

  protected selectBy(filter: PropsSet): Promise<P[]> {
    const table = this.mapper.getTableName();
    const fields = this.mapper.getColumnsNames();
    const wherePlaces = Object.keys(filter).map((field: string) => `${field} = ?`).join(',\n');
    const whereSql = wherePlaces.length ? `WHERE ${wherePlaces}` : '';
    const whereValues = Object.values(filter);

    return new Promise((resolve, reject) => this.db.all(
      `SELECT ${fields}
       FROM ${table} ${whereSql}`,
      [...whereValues],
      (err, rows: P[]) => {
        handlePromiseError(reject, err);
        resolve(rows);
      }
    ));
  };

  protected create(propsSet: P): Promise<P> {
    const table = this.mapper.getTableName();
    const fields = Object.keys(propsSet);
    const places = fields.map(() => '?').join(',');
    const values = Object.values(propsSet);
    const sql = `INSERT INTO ${table}(${fields.join(',')})
                 VALUES (${places})`;

    return new Promise((resolve, reject) => this.db.run(
      sql,
      values,
      function(err) {
        handlePromiseError(reject, err);
        propsSet.id = this.lastID
        resolve(propsSet);
      }
    ));
  }

  protected update(propsSet: P): Promise<P> {
    const table = this.mapper.getTableName();
    const fields = Object.keys(propsSet);
    const places = fields.map((field: string) => `${field} = ?`).join(',\n');
    const values = Object.values(propsSet);
    const sql = `UPDATE ${table}
                 SET ${places}
                 WHERE id = ?`;

    return new Promise((resolve, reject) => this.db.run(
      sql,
      [...values, propsSet.id],
      (err) => {
        handlePromiseError(reject, err);
        resolve(propsSet);
      }
    ));
  }
}
