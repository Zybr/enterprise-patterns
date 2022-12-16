import Person from "../../../Data Patterns/Data Source/Data Mapper/Domain/Models/Person";

export default class PersonRenderObjectFactory {
  public makeObject(person: Person): Object {
    return {
      id: person.id,
      fullName: `${person.getFirstName()} ${person.getLastName()}`,
      email: person.getEmail()
    };
  }
}
