import PersonTableGateway from "./PersonTableGateway";
import { faker } from '@faker-js/faker';
import PersonData from "../../Data Patterns/Data Source/Types/PersonData";
import { commonDbm } from "../../../database/databases";
import { createPersonData, makePersonData } from "../../Data Patterns/Data Source/Utils/database";

const assertEqualPersons = (personA: PersonData, personB: PersonData): void => {
  expect(personA.id).toEqual(personB.id);
  expect(personA.first_name).toEqual(personB.first_name);
  expect(personA.last_name).toEqual(personB.last_name);
  expect(personA.email).toEqual(personB.email);
}

const tableGateway = new PersonTableGateway(commonDbm.getDb());

describe('PersonTableGateway', () => {
  beforeAll(async () => await commonDbm.init());

  beforeEach(async () => await commonDbm.clearTable('persons'));

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

    const id = await tableGateway.create(person);

    const createdPerson = await tableGateway.find(id);
    person.id = id;
    assertEqualPersons(Object.assign(person, {id}), createdPerson);
  });

  test('update()', async () => {
    const person = await createPersonData();
    const data = {
      id: person.id,
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email()
    }

    const wasUpdated = await tableGateway.update(data)

    const personFetched = await tableGateway.find(data.id);
    expect(wasUpdated).toBeTruthy();
    assertEqualPersons(personFetched, data);
  });

  test('delete()', async () => {
    const person = await createPersonData();

    const wasDeleted = await tableGateway.delete(person.id);

    expect(wasDeleted).toBeTruthy();
    const personDeleted = await commonDbm.selectById('persons', person.id);
    expect(personDeleted).toBeNull()
  });
});
