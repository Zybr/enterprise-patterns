import Database from "./Database";

describe('Database', () => {
  const database = new Database();

  test('getRow()', () => {
    const ids: number[] = [];

    for (let i = 1; i <= 5; i++) {
      ids.push(database.getRow().id)
    }

    expect(new Set(ids).size).toEqual(ids.length);
  });
});
