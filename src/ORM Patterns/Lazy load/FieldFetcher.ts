import { handlePromiseError } from "../../utils/utils";
import { Database } from "sqlite3";

export default class FieldFetcher {
  public constructor(
    private db: Database
  ) {
  }

  public getField(table: string, id: number, field: string): Promise<string> {
    return new Promise<string>((resolve, reject) => this.db.get(
      `SELECT ${field}
       FROM ${table}
       WHERE id = ?`,
      [id],
      (err, row) => {
        handlePromiseError(reject, err);
        resolve(row ? row[field] : null);
      }
    ));
  }
}
