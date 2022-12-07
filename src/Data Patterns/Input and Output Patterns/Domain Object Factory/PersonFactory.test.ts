import PersonObjectFactory from "./PersonObjectFactory";
import { faker } from '@faker-js/faker';

describe('PersonFactory', () => {
  const factory = new PersonObjectFactory();

  test('newPerson()', () => {
    const rawData = {
      id: parseInt(faker.random.numeric()),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      year: parseInt(faker.random.numeric()),
    }

    const person = factory.newPerson(rawData);

    expect(person.id).toEqual(rawData.id);
    expect(person.firstName).toEqual(rawData.first_name);
    expect(person.lastName).toEqual(rawData.last_name);
    expect(person.year).toEqual(rawData.year);
  });
});
