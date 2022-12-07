import Person from "../models/Person";

export default class PersonObjectFactory {
  public newPerson(rawData: {}): Person {
    const person = new Person(
      rawData['first_name'] || '',
      rawData['last_name'] || ''
    );

    person.id = rawData['id'] || null
    person.year = rawData['year'] || null

    return person;
  }
}
