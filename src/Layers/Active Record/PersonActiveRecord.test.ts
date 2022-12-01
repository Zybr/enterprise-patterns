import { db, initDb } from "../../../database/db";
import { clearTable } from "../../Utils/database";
import { createPersonData, makePersonData } from "../Utils/database";
import PersonData from "../Types/PersonData";
import PersonActiveRecord from "./PersonActiveRecord";

const assertEqualPersons = (personData: PersonData, rowData: PersonActiveRecord): void => {
  expect(rowData.getId()).toEqual(personData.id);
  expect(rowData.getFirstName()).toEqual(personData.first_name);
  expect(rowData.getLastName()).toEqual(personData.last_name);
  expect(rowData.getEmail()).toEqual(personData.email);
}

PersonActiveRecord.setDb(db);

describe('PersonRwoDataGateway', () => {
  beforeAll(initDb);

  beforeEach(async () => {
    await clearTable('persons');
  });

  test('findAll()', async () => {
    const dataA = await createPersonData();
    const dataB = await createPersonData();

    const rows = await PersonActiveRecord.findAll();

    expect(rows.length).toEqual(2);
    assertEqualPersons(dataA, rows[0]);
    assertEqualPersons(dataB, rows[1]);
  });

  test('find()', async () => {
    await createPersonData();
    const data = await createPersonData();

    const fetchedRow = await PersonActiveRecord.find(data.id);

    assertEqualPersons(data, fetchedRow);
  });

  test('create()', async () => {
    const data = makePersonData();

    const createdPerson = await (new PersonActiveRecord(db))
      .setFirstName(data.first_name)
      .setLastName(data.last_name)
      .setEmail(data.email)
      .save();

    const id = createdPerson.getId();
    expect(id).not.toBeNull()
    assertEqualPersons(Object.assign(data, {id}), createdPerson);
  });

  test('update()', async () => {
    const dataA = await createPersonData();
    const dataB = await createPersonData();

    const updatedPerson = await (new PersonActiveRecord(db))
      .setFirstName(dataA.first_name)
      .setLastName(dataA.last_name)
      .setEmail(dataA.email)
      .save();
    await updatedPerson
      .setFirstName(dataB.first_name)
      .setLastName(dataB.last_name)
      .setEmail(dataB.email)
      .save();

    const personFetched = await PersonActiveRecord.find(updatedPerson.getId());

    assertEqualPersons(
      Object.assign(dataB, {id: updatedPerson.getId()}),
      personFetched
    );
  });

  test('delete()', async () => {
    const data = await createPersonData();
    const personRow = await (new PersonActiveRecord(db))
      .setFirstName(data.first_name)
      .setLastName(data.last_name)
      .setEmail(data.email)
      .save();

    expect(await personRow.delete()).toBeTruthy();

    expect(await PersonActiveRecord.find(personRow.getId())).toBeNull();

    expect(await personRow.delete()).toBeFalsy();
  });
});
