import PersonPagingIterator from "./PersonPagingIterator";
import { commonDbm } from "../../../../database/databases";
import { makePersonProps } from "../../utils/utils";
import PersonPropsSet from "../Update Factory/properties/PersonPropSet";
import PropsSet from "../../Data Source/Data Mapper/Dao/Entities/PropsSet";
import Person from "../models/Person";
import { camelCaseToUnderscore } from "../../../utils/utils";

const assertEqualsPersons = (expected: PropsSet, actual: Person): void => {
  expect(expected.id).toEqual(actual.id);
  expect(expected.first_name).toEqual(actual.firstName);
  expect(expected.last_name).toEqual(actual.lastName);
  expect(expected.year).toEqual(actual.year);
}

const createPersons = (count: number) => {
  const insertions: Promise<PersonPropsSet>[] = [];

  for (let i = 1; i <= count; i++) {
    const props = makePersonProps();
    const data = {};

    for (const key in props) {
      data[camelCaseToUnderscore(key)] = props[key];
    }

    insertions.push(
      commonDbm.insert('persons', data)
        .then(id => Object.assign({id}, data))
    )
  }

  return Promise.all(insertions)
    .then(rows => rows.sort((rowA, rowB) => rowA['id'] - rowB['id']));
}

describe('PersonPagingIterator', () => {
  const iterator = new PersonPagingIterator(commonDbm.getDb());

  beforeEach(() => commonDbm.clearTable('persons'));

  test('getNext()', async () => {
    const maxPageSize = 5;
    const rows = await createPersons(7);

    let page = await iterator.getNext(maxPageSize);

    expect(page.size).toEqual(5);
    assertEqualsPersons(rows[0], page.get(0));
    assertEqualsPersons(rows[4], page.get(4));
    expect(page.get(5)).toBeNull();

    page = await iterator.getNext(maxPageSize);

    expect(page.size).toEqual(2);
    assertEqualsPersons(rows[5], page.get(0));
    assertEqualsPersons(rows[6], page.get(1));
    expect(page.get(2)).toBeNull();

    page = await iterator.getNext(maxPageSize);

    expect(page.size).toEqual(0);
    expect(page.get(0)).toBeNull();
  });
});
