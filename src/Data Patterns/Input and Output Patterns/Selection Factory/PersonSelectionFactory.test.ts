import PersonSelectionFactory from "./PersonSelectionFactory";

describe('PersonSelectionFactory', () => {
  const factory = new PersonSelectionFactory();

  test('empty', () => {
    expect(factory.newSelection({})).toEqual('TRUE');
  });

  test('criteria "id"', () => {
    expect(factory.newSelection({id: 3})).toEqual('id = 3');
  });

  test('criteria "first_name"', () => {
    expect(factory.newSelection({firstName: 'John'})).toEqual('first_name = "John"');
  });

  test('criteria "last_name"', () => {
    expect(factory.newSelection({lastName: 'Smith'})).toEqual('last_name = "Smith"');
  });

  test('criteria "year"', () => {
    expect(factory.newSelection({year: [1912, 1950]})).toEqual('year BETWEEN 1912 AND 1950');
  });

  test('combination of criteria', () => {
    expect(factory.newSelection({
      id: 3,
      firstName: null,
      lastName: 'Smith',
      year: [1960, 1980],
    }))
      .toEqual('id = 3 AND last_name = "Smith" AND year BETWEEN 1960 AND 1980');
  });
});
