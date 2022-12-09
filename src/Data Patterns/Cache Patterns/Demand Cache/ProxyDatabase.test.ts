import Database from "../Database";
import ProxyDatabase from "./ProxyDatabase";

describe('ProxyDatabase', () => {
  const database = new ProxyDatabase(new Database());

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
});
