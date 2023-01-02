import { DbManager } from "../../../../database/databases";
import { handlePromiseError } from "../../../utils/utils";

export default class History {
  private readonly table = 'sessions';

  constructor(
    private readonly dbMgr: DbManager
  ) {
  }

  public add(id: string, data: Object): Promise<any> {
    return this.dbMgr
      .insert(
        this.table,
        {
          session_id: id,
          data: JSON.stringify(data),
        }
      )
      .then(() => undefined)
  }

  public list(id: string): Promise<{}[]> {
    return this.dbMgr.selectAll(this.table)
      .then(
        rows => rows
          .filter(row => row['session_id'] === id)
          .sort((rowA, rowB) => parseInt(rowA['id']) - parseInt(rowB['id']))
          .map(row => JSON.parse(row['data']))
      )
  }

  public clear(id: string): Promise<null> {
    return new Promise(
      (resolve, reject) => this.dbMgr.getDb().run(
        `DELETE
         FROM ${this.table}
         WHERE session_id = ?`,
        [id],
        (err) => {
          handlePromiseError(reject, err);
          resolve(null);
        }
      )
    )
  }
}
