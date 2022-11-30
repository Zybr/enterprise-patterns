import { Database } from "sqlite3"
import * as fs from 'fs';

const db = new Database(__dirname + '/db.sqlite');

const initDb = () => {
  const createSchemasSql = fs.readFileSync(__dirname + '/sql/create_schemas.sql');
  db.exec(createSchemasSql.toString(), (err) => {
    if (err) {
      console.error(err)
    }
  });
}

export {
  db,
  initDb,
};
