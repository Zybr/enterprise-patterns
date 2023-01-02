import History from "./History";
import { faker } from '@faker-js/faker';

describe('History', () => {
  const history = new History(__dirname + '/history.txt');

  beforeEach(async () => await history.clear());

  test('add(); lines(); clear()', async () => {
    const items = [
      {key: faker.word.noun()},
      {key: faker.word.noun()},
      {key: faker.word.noun()},
    ]

    items.forEach(item => history.add(item));

    expect(history.list()).toEqual(items);

    await history.clear();

    expect(history.list()).toEqual([]);
  });
});
