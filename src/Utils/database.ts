import { db } from "../../database/db";
import { handlePromiseError } from "./utils";

export const clearTable = (table: string): Promise<null> => new Promise(
  (resolve, reject) => db.run(
    `DELETE
     FROM ${table}
     WHERE TRUE`,
    (err) => {
      handlePromiseError(reject, err);
      resolve(null);
    }
  )
);

export const insert = (table: string, data: Object) => new Promise<number>(
  (resolve, reject) => db.run(
    `INSERT INTO ${table}(${Object.keys(data).join(',')})
     VALUES (${Object.values(data).map(() => '?').join(',')})`,
    Object.values(data),
    function(err) {
      handlePromiseError(reject, err);
      resolve(this.lastID);
    }
  )
);

export const selectById = (table: string, id: number) => new Promise<[] | null>(
  (resolve, reject) => db.run(
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
