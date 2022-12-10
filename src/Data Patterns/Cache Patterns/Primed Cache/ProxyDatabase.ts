import { IDatabase } from "../IDatabase";
import Database from "../Database";
import Row from "../Row";
import Cache from "../Cache/Cache";
import PartialKeysList from "./PartialKeysList";

export default class ProxyDatabase implements IDatabase {
  private database: Database;
  private readonly cache: Cache;
  private readonly partialKeysList: PartialKeysList;

  public constructor(database: Database) {
    this.database = database;
    this.cache = new Cache();
    this.partialKeysList = new PartialKeysList();
  }

  public getRow(inx: number): Row {
    const key = '' + inx;

    if (
      this.partialKeysList.has(key)
      && this.cache.has(key)
    ) {
      return this.cache.get(key);
    }

    const value = this.database.getRow(inx)

    this.cache.put(key, value);
    this.partialKeysList.add(key);

    return value;
  }
}
