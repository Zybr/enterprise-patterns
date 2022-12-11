import { handlePromiseError } from "../src/utils/utils";
import { Database } from "sqlite3"
import * as fs from 'fs';

/**
 * Util for communication with databases on low level
 */
export class DbManager {
  private readonly DB_DIR = __dirname + '/sql/';
  private readonly SCHEMA_DIR = __dirname + '/db/';
  private readonly name: string;
  private readonly database: Database;

  public constructor(name: string) {
    this.name = name;
    this.database = new Database(this.getDbPath());
  }

  public init = (): Promise<null> => new Promise(
    (resolve, reject) => this.database.exec(
      fs.readFileSync(this.DB_DIR + this.name + '.sql').toString(),
      (err) => {
        handlePromiseError(reject, err)
        resolve(null);
      }
    )
  )

  public getDb(): Database {
    return this.database;
  }

  public getDbPath(): string {
    return this.SCHEMA_DIR + this.name + '.sqlite';
  }

  public clearTable = (table: string): Promise<null> => new Promise(
    (resolve, reject) => this.getDb().run(
      `DELETE
       FROM ${table}
       WHERE TRUE`,
      (err) => {
        handlePromiseError(reject, err);
        resolve(null);
      }
    )
  )

  public insert = (table: string, data: Object) => new Promise<number>(
    (resolve, reject) => this.getDb().run(
      `INSERT INTO ${table}(${Object.keys(data).join(',')})
       VALUES (${Object.values(data).map(() => '?').join(',')})`,
      Object.values(data),
      function(err) {
        handlePromiseError(reject, err);
        resolve(this.lastID);
      }
    )
  )

  public selectById = (table: string, id: number) => new Promise<[] | null>(
    (resolve, reject) => this.getDb().get(
      `SELECT *
       FROM ${table}
       WHERE id = ?`,
      [id],
      function(err, row) {
        handlePromiseError(reject, err);
        resolve(row === undefined ? null : row);
      }
    )
  );
}

export const commonDbm = new DbManager('common');
export const personEmailDbm = new DbManager('person-email');
