import Database from "../Database";
import ProxyDatabase from "./ProxyDatabase";
import DatabaseManager from "./DatabaseManager";

describe('DatabaseManager', () => {
  test('Configured indexes were precached', () => {
    const db = new ProxyDatabase(new Database());
    const dbGetRow = jest.spyOn(db, 'getRow');
    new DatabaseManager(db).getDatabase();

    expect(dbGetRow.mock.calls).toEqual([
      [1],
      [3],
      [5],
    ])
  });
});
