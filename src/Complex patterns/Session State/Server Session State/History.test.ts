import History from "./History";
import { faker } from '@faker-js/faker';
import { generateUid } from "../../../utils/utils";

describe('History', () => {
  const history = new History(__dirname + '/history/');
  const sessionId = generateUid();

  beforeEach(() => history.clear(sessionId));

  test('add(); lines(); clear()', async () => {
    const items = [
      {key: faker.word.noun()},
      {key: faker.word.noun()},
      {key: faker.word.noun()},
    ]

    items.forEach(item => history.add(sessionId, item));

    expect(history.list(sessionId,)).toEqual(items);

    await history.clear(sessionId);

    expect(history.list(sessionId)).toEqual([]);
  });
});
