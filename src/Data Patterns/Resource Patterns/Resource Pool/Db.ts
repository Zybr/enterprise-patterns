import { handlePromiseError } from "../../../utils/utils";
import { Database } from "sqlite3"
import IResource from "./IResource";

export default class Db implements IResource {
  private db: Database | null;

  public constructor(db: Database) {
    this.db = db;
  }

  public selectOne(sql: string, params: []): Promise<[] | null> {
    return new Promise<[] | null>(
      (resolve, reject) => this.db.get(
        sql,
        params,
        (err, row) => {
          handlePromiseError(reject, err);
          resolve(row === undefined ? null : row);
        }
      )
    );
  }

  public close(): this {
    this.db.close();
    return this;
  }
}
