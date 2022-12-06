import ManagerFactory from "../ManagerFactory";
import { personEmailDbm } from "../../../../../database/databases";
import { faker } from '@faker-js/faker';
import Person from "../../Domain/Models/Person";
import PropsSet from "../Entities/PropsSet";
import PersonManager from "./PersonManager";

const assertEqualsPersons = (expected: PropsSet, actual: Person): void => {
  expect(expected.id).toEqual(actual.id);
  expect(expected.first_name).toEqual(actual.getFirstName());
  expect(expected.last_name).toEqual(actual.getLastName());
  // expect(expected.email).toEqual(actual.getEmail()); Random behaviour
}

const makePerson = (): PropsSet => {
  return {
    id: null,
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
  }
};

const createPerson = async (): Promise<PropsSet> => {
  const props = await makePerson();
  const emailId = await personEmailDbm.insert('emails', {
    mail: props.email,
  });

  props.id = await personEmailDbm.insert('persons', {
    first_name: props.first_name,
    last_name: props.last_name,
    email_id: emailId,
  });

  return props;
}

describe('PersonManager', () => {
  const factory = new ManagerFactory(personEmailDbm.getDb());
  const personManager = factory.makeManager(Person.name) as PersonManager;
  const emailManager = factory.makeEmailManager();

  beforeAll(() => personEmailDbm.init())

  beforeEach(() => {
    personEmailDbm.clearTable('persons');
    personEmailDbm.clearTable('emails');
  })

  test('find()', async () => {
    const set = await createPerson();

    assertEqualsPersons(
      set,
      await personManager.find(set.id)
    )
  });

  test('findAll()', async () => {
    const sets = [
      await createPerson(),
      await createPerson(),
    ]

    const persons = await personManager.findAll() as Person[];

    expect(sets.length).toEqual(persons.length);
    persons.forEach((person, i) => assertEqualsPersons(sets[i], person))
  });

  test('save()', async () => {
    const set = await makePerson();

    const person = await personManager.save(
      (new Person())
        .setFirstName(set.first_name as string)
        .setLastName(set.last_name as string)
        .setEmail(set.email as string)
    )

    // Check returned
    expect(person.id).not.toBeNull();
    set.id = person.id;
    assertEqualsPersons(set, person);

    // Check fetched by managers
    const personSaved = await personManager.find(set.id);
    assertEqualsPersons(set, personSaved);
    const emailSaved = (await emailManager.findBy({mail: set.email}))[0]
    expect(emailSaved.id).not.toBeNull();
    expect(emailSaved.mail).toEqual(set.email);

    // Check saved in DB
    const personRow = await personEmailDbm.selectById('persons', set.id);
    expect(personRow).not.toBeNull();

    // Check email fetched by manager
    const emailRow = await personEmailDbm.selectById('emails', emailSaved.id);
    expect(emailRow).not.toBeUndefined();
    expect(emailRow['mail']).toEqual(set.email)
    expect(personRow['email_id']).toEqual(emailRow['id']);
  });

  test('delete()', async () => {
    const set = await createPerson();
    const person = await personManager.find(set.id)
    let personRow = await personEmailDbm.selectById('persons', set.id);

    await personManager.delete(person);

    expect(await personEmailDbm.selectById('persons', set.id)).toBeNull();
    expect(await personEmailDbm.selectById('emails', personRow['email_id'])).toBeNull();
    expect(await personManager.find(set.id)).toBeNull();
    expect(await emailManager.find(personRow['email_id'])).toBeNull();
  });
});
