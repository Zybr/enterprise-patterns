import Storage from "./Storage";
import Record from "./Record";
import { faker } from "@faker-js/faker";

const makeRecord = (data: any): Record => new Record().setData(data);

describe('Storage', () => {
  const storage = new Storage(__dirname + '/data.txt')
  const dataA = {value: faker.word.noun()};
  const dataB = {value: faker.word.noun()};

  beforeEach(() => storage.clear());

  test('write() - version', () => {
    const recordA = makeRecord(dataA);

    storage.write(recordA);
    expect(recordA.getVersion()).toEqual(1);

    recordA.setData(dataB);
    storage.write(recordA);
    expect(recordA.getVersion()).toEqual(2);

    storage.write(recordA);
    expect(recordA.getVersion()).toEqual(3);
  });

  test('write() - concurrency', () => {
    const recordA = makeRecord(dataA);
    const storedRecordA1 = storage.write(recordA);
    const storedRecordA2 = storage.read(recordA.getId());

    storedRecordA2.setData(dataB);
    storage.write(storedRecordA2)

    expect(() => storage.write(storedRecordA1))
      .toThrow('Passed version is out of date: 1 < 2');
  });
});
