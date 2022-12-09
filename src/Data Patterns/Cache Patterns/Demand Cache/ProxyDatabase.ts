import { IDatabase } from "../IDatabase";
import Database from "../Database";
import Row from "../Row";
import Cache from "./Cache";

export default class ProxyDatabase implements IDatabase {
  private database: Database;
  private readonly cache: Cache;

  public constructor(database: Database) {
    this.database = database;
    this.cache = new Cache();
  }

  public getRow(inx: number): Row {
    const key = '' + inx;

    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    return this.cache.put(
      key,
      this.database.getRow(inx)
    );
  }
}
