import UpdateMap from "./maps/UpdateMap";
import { camelCaseToUnderscore } from "../../../utils/utils";
import InsertMap from "./maps/InsertMap";
import PersonPropsSet from "./properties/PersonPropSet";

export default class PersonUpdateFactory {

  public createInsert(props: PersonPropsSet): InsertMap {
    const attrs = Object.keys(props);

    return {
      fields: attrs
        .filter(attr => attr != 'id')
        .map(attr => camelCaseToUnderscore(attr))
        .join(', '),
      values: attrs
        .filter(attr => attr != 'id')
        .map(attr => props[attr])
        .join(', '),
    }
  }

  public createUpdate(props: PersonPropsSet): UpdateMap {
    return {
      where: `id = ${props.id}`,
      values: Object.keys(props)
        .filter(attr => attr != 'id')
        .map(attr => this.makeMatch(props, attr))
        .filter(condition => condition !== null)
        .join(' '),
    }
  }

  private makeMatch(props: PersonPropsSet, attr: string): string | null {
    const field = camelCaseToUnderscore(attr);

    if (props[attr] === undefined || props[attr] === null) {
      return null;
    }

    return `${field} = ${typeof props[attr] === 'string' ? `"${props[attr]}"` : props[attr]}`;
  }
}
