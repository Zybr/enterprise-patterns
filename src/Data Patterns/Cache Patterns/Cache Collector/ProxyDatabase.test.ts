import Database from "../Database";
import ProxyDatabase from "./ProxyDatabase";
import Cache from "./TimedCache/Cache";
import { pause } from "../../utils/utils";

describe('ProxyDatabase', () => {
  const database = new ProxyDatabase(new Database, new Cache);

  afterAll(() => database.stopAutoClear())

  test('getRow()', () => {
    const ids: number[] = [];

    for (let i = 1; i <= 5; i++) {
      ids.push(database.getRow(1).id)
    }

    for (let i = 1; i <= 5; i++) {
      ids.push(database.getRow(2).id)
    }

    expect(new Set(ids).size).toEqual(2);
  });

  test('getRow() expired', async () => {
    const inx = 1;
    const val = database.getRow(inx).id;

    expect(database.getRow(inx).id).toEqual(val);
    await pause(500);
    expect(database.getRow(inx).id).not.toEqual(val);
  });
});
