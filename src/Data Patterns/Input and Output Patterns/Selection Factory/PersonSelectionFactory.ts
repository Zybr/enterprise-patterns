import IPersonSelectCriteria from "./criteria/IPersonSelectCriteria";
import { camelCaseToUnderscore } from "../../../utils/utils";

export default class PersonSelectionFactory {
  public newSelection(criteria: IPersonSelectCriteria): string {
    const conditions = Object.keys(criteria)
      .map(attr => this.makeCondition(criteria, attr))
      .filter(condition => condition !== null)
      .join(' AND ');

    return (conditions.length) ? conditions : 'TRUE'; // To make "WHERE TRUE" after joining
  }

  private makeCondition(criteria: IPersonSelectCriteria, attr: string): string | null {
    const field = camelCaseToUnderscore(attr);

    if (criteria[attr] === undefined || criteria[attr] === null) {
      return null;
    }

    if (Array.isArray(criteria[attr])) {
      return `${field} BETWEEN ${criteria[attr][0]} AND ${criteria[attr][1]}`;
    }

    return `${field} = ${typeof criteria[attr] === 'string' ? `"${criteria[attr]}"` : criteria[attr]}`;
  }
}
