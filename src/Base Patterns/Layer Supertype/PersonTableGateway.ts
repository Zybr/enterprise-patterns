import PersonData from "../../Data Patterns/Data Source/Types/PersonData";
import TableGateway from "./TableGateway";

/**
 * @see "src/Data Patterns/Data Source/Table Data Gateway/PersonTableGateway.ts"
 */
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
    ];
  }
}
