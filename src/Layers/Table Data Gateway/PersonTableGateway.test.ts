import { initDb } from "../../../database/db";
import { clearTable, selectById } from "../../Utils/database";
import { createPerson, makePerson } from "../Utils/database";
import PersonTableGateway from "./PersonTableGateway";
import { faker } from '@faker-js/faker';
import Person from "./Person";

const assertEqualPersons = (personA: Person, personB: Person): void => {
  expect(personA.id).toEqual(personB.id);
  expect(personA.first_name).toEqual(personB.first_name);
  expect(personA.last_name).toEqual(personB.last_name);
  expect(personA.email).toEqual(personB.email);
}

const tableGateway = new PersonTableGateway();

describe('PersonTableGateway', () => {
  beforeAll(initDb);

  beforeEach(async () => {
    await clearTable('persons');
  })

  test('findAll()', async () => {
    const personA = await createPerson();
    const personB = await createPerson();

    const persons = await tableGateway.findAll();

    expect(persons.length).toEqual(2);
    assertEqualPersons(personA, persons[0]);
    assertEqualPersons(personB, persons[1]);
  });

  test('find()', async () => {
    await createPerson();
    const personB = await createPerson();

    const personFetched = await tableGateway.find(personB.id);

    assertEqualPersons(personB, personFetched);
  });

  test('create()', async () => {
    const person = makePerson();

    const id = await tableGateway.create(person.first_name, person.last_name, person.email);

    const createdPerson = await tableGateway.find(id);
    person.id = id;
    assertEqualPersons(Object.assign(person, {id}), createdPerson);
  });

  test('update()', async () => {
    const person = await createPerson();
    const update = {
      id: person.id,
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email()
    }

    const wasUpdated = await tableGateway.update(
      update.id,
      update.first_name,
      update.last_name,
      update.email
    )

    const personFetched = await tableGateway.find(update.id);
    expect(wasUpdated).toBeTruthy();
    assertEqualPersons(personFetched, update);
  });

  test('delete()', async () => {
    const person = await createPerson();

    const wasDeleted = await tableGateway.delete(person.id);

    expect(wasDeleted).toBeTruthy();
    const personDeleted = await selectById('persons', person.id);
    expect(personDeleted).toBeNull()
  });
});
