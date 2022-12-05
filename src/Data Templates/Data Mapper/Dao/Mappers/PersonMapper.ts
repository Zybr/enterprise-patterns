import EntityMapper from "./EntityMapper";
import Person from "../../Domain/Models/Person";
import PersonPropsSet from "../Entities/PersonPropsSet";

export default class PersonMapper extends EntityMapper<Person, PersonPropsSet> {
  public mapEntity(person: Person, props: PersonPropsSet): Person {
    if (this.isInt(props['id'])) {
      person.id = props.id;
    }

    if (this.isString(props.first_name)) {
      person.setFirstName(props.first_name as string);
    }

    if (this.isString(props.last_name)) {
      person.setLastName(props.last_name as string);
    }

    return person;
  }

  public makePropsSet(person: Person): PersonPropsSet {
    return {
      id: person.id,
      first_name: person.getFirstName(),
      last_name: person.getLastName(),
      email_id: null,
    };
  }

  public getTableName(): string {
    return "persons";
  }

  public getColumnsNames(): string[] {
    return Object.keys(this.makePropsSet(new Person()));
  }
}
