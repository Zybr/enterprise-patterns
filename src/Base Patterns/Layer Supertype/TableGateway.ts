import { handlePromiseError } from "../../utils/utils";
import { Database } from "sqlite3";
import Entity from "./Entity";

export default abstract class TableGateway<T extends Entity> {
  public constructor(
    protected readonly db: Database,
  ) {
  }

  protected abstract getTableName(): string;

  protected abstract getColumns(): string[];

  public find(id: number): Promise<T | null> {
    return new Promise((resolve, reject) => this.db.get(
      `SELECT ${this.getColumns()}
       FROM ${this.getTableName()}
       WHERE id = ?`,
      [id],
      (err, row) => {
        handlePromiseError(reject, err);
        resolve(row);
      }
    ));
  }

  public findAll(): Promise<T[]> {
    return new Promise((resolve, reject) => this.db.all(
        `SELECT ${this.getColumns()}
         FROM ${this.getTableName()}`,
        (err, rows) => {
          handlePromiseError(reject, err);
          resolve(rows);
        }
      )
    );
  }

  public create(data: T): Promise<number> {
    return new Promise((resolve, reject) => this.db.run(
      `INSERT INTO ${this.getTableName()}(${this.getChangeableColumns()})
       VALUES (${this.getPlaceholderKeys()})`,
      this.getReplaces(data),
      function(err) {
        handlePromiseError(reject, err);
        resolve(this.lastID);
      }
    ));
  }

  public update(data: T): Promise<boolean> {
    return new Promise((resolve, reject) => this.db.run(
      `UPDATE ${this.getTableName()}
       SET ${this.getPlaceholderKeyValues().join(', \n')}
       WHERE id = $id`,
      {
        '$id': data.id,
        ...this.getReplaces(data),
      },
      function(err) {
        handlePromiseError(reject, err);
        resolve(this.changes > 0);
      }
    ));
  }

  public delete(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => this.db.run(
      `DELETE
       FROM ${this.getTableName()}
       WHERE id = ?`,
      [id],
      function(err) {
        handlePromiseError(reject, err);
        resolve(this.changes > 0);
      }
    ));
  }

  private getChangeableColumns(): string [] {
    return this.getColumns()
      .filter(key => key !== 'id');
  }

  private getPlaceholderKeys(): string [] {
    return this.getChangeableColumns()
      .map(key => `$${key}`);
  }

  private getPlaceholderKeyValues(): string[] {
    return this.getChangeableColumns()
      .reduce(
        (set, key) => {
          set.push(`${key} = $${key}`);
          return set;
        },
        []
      );
  }

  private getReplaces(data: T): {} {
    return this.getChangeableColumns()
      .reduce(
        (replaces, key) => {
          replaces[`$${key}`] = data[key];
          return replaces;
        },
        {}
      )
  }
}
