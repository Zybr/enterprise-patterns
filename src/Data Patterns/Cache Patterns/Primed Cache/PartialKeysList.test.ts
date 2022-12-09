import PartialKeysList from "./PartialKeysList";

describe('PartialKeysList', () => {
  const keysList = new PartialKeysList();

  test('add() & has()', () => {
    const key = '1';

    expect(keysList.has(key)).toBeFalsy();

    keysList.add(key);

    expect(keysList.has(key)).toBeTruthy();
  });
});
