import Row from "./Cache Accessor/Row";
import { IDatabase } from "./IDatabase";

export default class Database implements IDatabase {
  public getRow(): Row {
    return {
      id: Math.round(Math.random() * 100000)
    }
  }
}
