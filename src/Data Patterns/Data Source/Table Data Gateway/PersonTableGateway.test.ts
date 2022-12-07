import { createPersonData, makePersonData } from "../Utils/database";
import PersonTableGateway from "./PersonTableGateway";
import { faker } from '@faker-js/faker';
import PersonData from "../Types/PersonData";
import { commonDbm } from "../../../../database/databases";

const assertEqualPersons = (personA: PersonData, personB: PersonData): void => {
  expect(personA.id).toEqual(personB.id);
  expect(personA.first_name).toEqual(personB.first_name);
  expect(personA.last_name).toEqual(personB.last_name);
  expect(personA.email).toEqual(personB.email);
}

const tableGateway = new PersonTableGateway(commonDbm.getDb());

describe('PersonTableGateway', () => {
  beforeAll(() => commonDbm.init());

  beforeEach(async () => {
    await commonDbm.clearTable('persons');
  })

  test('findAll()', async () => {
    const personA = await createPersonData();
    const personB = await createPersonData();

    const persons = await tableGateway.findAll();

    expect(persons.length).toEqual(2);
    assertEqualPersons(personA, persons[0]);
    assertEqualPersons(personB, persons[1]);
  });

  test('find()', async () => {
    await createPersonData();
    const personB = await createPersonData();

    const personFetched = await tableGateway.find(personB.id);

    assertEqualPersons(personB, personFetched);
  });

  test('create()', async () => {
    const person = makePersonData();

    const id = await tableGateway.create(person.first_name, person.last_name, person.email);

    const createdPerson = await tableGateway.find(id);
    person.id = id;
    assertEqualPersons(Object.assign(person, {id}), createdPerson);
  });

  test('update()', async () => {
    const person = await createPersonData();
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
    const person = await createPersonData();

    const wasDeleted = await tableGateway.delete(person.id);

    expect(wasDeleted).toBeTruthy();
    const personDeleted = await commonDbm.selectById('persons', person.id);
    expect(personDeleted).toBeNull()
  });
});
