import { IDatabase } from "../IDatabase";
import primed from "./primed.json";

export default class DatabaseManager {
  public constructor(
    private readonly database: IDatabase,
  ) {
    primed.indexes.forEach(inx => this.database.getRow(inx));
  }

  public getDatabase(): IDatabase {
    return this.database;
  }
}
