import { PersonRowDataGateway } from "./PersonRowDataGateway";
import { createPersonData, makePersonData } from "../Utils/database";
import PersonData from "../Types/PersonData";
import { commonDbm } from "../../../database/databases";

const assertEqualPersons = (personData: PersonData, rowData: PersonRowDataGateway): void => {
  expect(rowData.getId()).toEqual(personData.id);
  expect(rowData.getFirstName()).toEqual(personData.first_name);
  expect(rowData.getLastName()).toEqual(personData.last_name);
  expect(rowData.getEmail()).toEqual(personData.email);
}

PersonRowDataGateway.setDb(commonDbm.getDb());

describe('PersonRwoDataGateway', () => {
  beforeAll(() => commonDbm.init());

  beforeEach(async () => {
    await commonDbm.clearTable('persons');
  });

  test('findAll()', async () => {
    const dataA = await createPersonData();
    const dataB = await createPersonData();

    const rows = await PersonRowDataGateway.findAll();

    expect(rows.length).toEqual(2);
    assertEqualPersons(dataA, rows[0]);
    assertEqualPersons(dataB, rows[1]);
  });

  test('find()', async () => {
    await createPersonData();
    const data = await createPersonData();

    const fetchedRow = await PersonRowDataGateway.find(data.id);

    assertEqualPersons(data, fetchedRow);
  });

  test('create()', async () => {
    const data = makePersonData();

    const createdPerson = await (new PersonRowDataGateway)
      .setFirstName(data.first_name)
      .setLastName(data.last_name)
      .setEmail(data.email)
      .create();

    const id = createdPerson.getId();
    expect(id).not.toBeNull()
    assertEqualPersons(Object.assign(data, {id}), createdPerson);
  });

  test('update()', async () => {
    const dataA = await createPersonData();
    const dataB = await createPersonData();

    const updatedPerson = await (new PersonRowDataGateway())
      .setFirstName(dataA.first_name)
      .setLastName(dataA.last_name)
      .setEmail(dataA.email)
      .create();
    await updatedPerson
      .setFirstName(dataB.first_name)
      .setLastName(dataB.last_name)
      .setEmail(dataB.email)
      .update();

    const personFetched = await PersonRowDataGateway.find(updatedPerson.getId());

    assertEqualPersons(
      Object.assign(dataB, {id: updatedPerson.getId()}),
      personFetched
    );
  });

  test('delete()', async () => {
    const data = await createPersonData();
    const personRow = await (new PersonRowDataGateway())
      .setFirstName(data.first_name)
      .setLastName(data.last_name)
      .setEmail(data.email)
      .create();

    expect(await personRow.delete()).toBeTruthy();

    expect(await PersonRowDataGateway.find(personRow.getId())).toBeNull();

    expect(await personRow.delete()).toBeFalsy();
  });
});
