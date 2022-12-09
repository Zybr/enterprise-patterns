import Row from "./Row";
import { IDatabase } from "./IDatabase";

export default class Database implements IDatabase {
  public getRow(inx: number): Row {
    return {
      id: Math.round(Math.random() * 100000)
    }
  }
}
