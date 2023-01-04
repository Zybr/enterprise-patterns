import TableGateway from "../Layer Supertype/TableGateway";
import PersonData from "./PersonData";
import DateRange from "./DateRange";
import { dateTimeToDbString, handlePromiseError } from "../../utils/utils";

export default class PersonTableGateway extends TableGateway<PersonData> {
  protected getTableName(): string {
    return 'persons';
  }

  protected getColumns(): string[] {
    return [
      'id',
      'first_name',
      'last_name',
      'email',
      'created_at'
    ];
  }

  public findCreatedAtRange(timeRange: DateRange): Promise<PersonData[]> {
    return new Promise((resolve, reject) => this.db.all(
      `SELECT *
       FROM persons
       WHERE created_at BETWEEN ? AND ?`,
      [
        dateTimeToDbString(timeRange.getStart()),
        dateTimeToDbString(timeRange.getEnd()),
      ],
      (err, rows) => {
        handlePromiseError(reject, err);
        resolve(rows);
      }
    ));
  }
}
