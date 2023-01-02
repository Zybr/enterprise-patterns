import Storage from "./Storage";
import Record from "./Record";
import { faker } from "@faker-js/faker";

const makeRecord = (data: any): Record => new Record().setData(data);

describe('Storage', () => {
  const storage = new Storage(__dirname + '/data.txt')
  const dataA = {value: faker.word.noun()};
  const dataB = {value: faker.word.noun()};

  beforeEach(() => storage.clear());

  test('write() - multiple', () => {
    const recordA = makeRecord(dataA);
    const recordB = makeRecord(dataB)
    const savedRecordA = storage.write(recordA);
    const savedRecordB = storage.write(recordB);

    expect(recordA.getId()).not.toBeNull();
    expect(recordA.getId()).toEqual(savedRecordA.getId());

    expect(savedRecordA.getId()).toEqual(0);
    expect(savedRecordA.getData()).toEqual(dataA);

    expect(savedRecordB.getId()).toEqual(1);
    expect(savedRecordB.getData()).toEqual(dataB);
  });

  test('read()', () => {
    const recordA = makeRecord(dataA);
    const recordB = makeRecord(dataB)

    storage.write(recordA);
    const savedRecordB = storage.write(recordB);

    const fetchedRecordB = storage.read(recordB.getId());

    expect(savedRecordB.getId()).toEqual(fetchedRecordB.getId());
    expect(savedRecordB.getData()).toEqual(fetchedRecordB.getData());
  });

  test('write() - concurrency', () => {
    const recordA = makeRecord(dataA);
    const savedRecordA1 = storage.write(recordA);
    const savedRecordA2 = storage.read(recordA.getId());

    storage.write(savedRecordA1);
    savedRecordA2.setData(dataB);
    storage.write(savedRecordA2)

    const savedRecord = storage.read(savedRecordA1.getId());

    expect(savedRecord.getId()).toEqual(savedRecordA2.getId());
    expect(savedRecord.getData()).toEqual(savedRecordA2.getData());
  });
});
