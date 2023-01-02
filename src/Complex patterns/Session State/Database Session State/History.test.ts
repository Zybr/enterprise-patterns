import History from "./History";
import { faker } from '@faker-js/faker';
import { generateUid } from "../../../utils/utils";
import { sessionDbm } from "../../../../database/databases";

describe('History', () => {
  const history = new History(sessionDbm);
  const sessionId = generateUid();

  beforeAll(async () => await sessionDbm.init());

  beforeEach(async () => await history.clear(sessionId));

  test('add(); lines(); clear()', async () => {
    const items = [
      {key: faker.word.noun()},
      {key: faker.word.noun()},
      {key: faker.word.noun()},
    ]

    let storeAll = Promise.resolve(null);

    items.forEach(item =>
      storeAll = storeAll.then(() => history.add(sessionId, item))
    )

    await storeAll;

    expect(await history.list(sessionId)).toEqual(items);

    await history.clear(sessionId);

    expect(await history.list(sessionId)).toEqual([]);
  });
});
