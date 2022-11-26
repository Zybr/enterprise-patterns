import { Database } from "sqlite3"
import * as fs from 'fs';

const db = new Database(__dirname + '/db.sqlite');

const initDb = () => {
  const createSchemasSql = fs.readFileSync(__dirname + '/sql/create_schemas.sql');
  const result = db.exec(createSchemasSql.toString());
  console.log(result);
}

export {
  db,
  initDb,
};
