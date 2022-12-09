import Row from "./Row";

export interface IDatabase {
  getRow(inx: number): Row
}
