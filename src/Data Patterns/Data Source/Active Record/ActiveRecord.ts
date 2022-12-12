import { handlePromiseError } from "../../../utils/utils";
import { Database } from "sqlite3";

/**
 * Base entity provides database methods to work with itself.
 * ID is required for entity but can be extended to use any kind of primary key.
 */
export default abstract class ActiveRecord {
  protected db: Database;

  protected id: number | null = null;

  /** Get entity table name */
  protected abstract getTableName(): string;

  /** Get map of table fields and model getters */
  protected abstract getFieldsGetters(): {};

  public constructor(db: Database) {
    this.db = db;
  }

  public getId(): number | null {
    return this.id;
  }

  public setId(id: number): this {
    this.id = id;

    return this;
  }

  public save(): Promise<this> {
    if (this.isNew()) {
      return this.create();
    } else {
      return this.update();
    }
  }

  private isNew(): boolean {
    return this.id === null;
  }

  private create(): Promise<this> {
    const self = this;
    const table = this.getTableName();
    const fieldsGetters = this.getFieldsGetters();
    const fields = Object.keys(fieldsGetters);
    const places = fields
      .map(() => '?')
      .join(',');
    const values = Object.values(fieldsGetters)
      .map((getter: () => {}) => getter());
    const sql = `INSERT INTO ${table}(${fields.join(',')})
                 VALUES (${places})`;

    return new Promise((resolve, reject) => this.db.run(
      sql,
      values,
      function(err) {
        handlePromiseError(reject, err);
        self.id = this.lastID;
        resolve(self);
      }
    ));
  }

  private update(): Promise<this> {
    const table = this.getTableName();
    const fieldsGetters = this.getFieldsGetters();
    const places = Object.keys(fieldsGetters)
      .map((field: string) => `${field} = ?`)
      .join(',\n');
    const values = Object.values(fieldsGetters)
      .map((getter: () => {}) => getter());
    const sql = `UPDATE ${table}
                 SET ${places}
                 WHERE id = ?`;

    return new Promise((resolve, reject) => this.db.run(
      sql,
      [...values, this.getId()],
      (err) => {
        handlePromiseError(reject, err);
        resolve(this);
      }
    ));
  }

  public delete(): Promise<boolean> {
    const table = this.getTableName();
    return new Promise((resolve, reject) => this.db.run(
      `DELETE
       FROM ${table}
       WHERE id = ?`,
      [this.id],
      function(err) {
        handlePromiseError(reject, err);
        resolve(this.changes > 0);
      }
    ));
  }
}
