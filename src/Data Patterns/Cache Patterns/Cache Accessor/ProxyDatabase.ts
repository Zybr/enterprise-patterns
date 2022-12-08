import { IDatabase } from "../IDatabase";
import Database from "../Database";
import Row from "./Row";

export default class ProxyDatabase implements IDatabase {
  private database: Database;

  public constructor(database: Database) {
    this.database = database;
  }

  public getRow(): Row {
    return this.database.getRow();
  }
}
