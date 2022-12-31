import Storage from "./Storage";
import Record from "./Record";
import { faker } from "@faker-js/faker";

const makeRecord = (data: any): Record => new Record().setData(data);

describe('Storage', () => {
  const storage = new Storage(__dirname + '/data.txt')
  const dataA = {value: faker.word.noun()};
  const dataB = {value: faker.word.noun()};

  beforeEach(async () => await storage.clear());

  test('write() - multiple', async () => {
    const recordA = makeRecord(dataA);
    const recordB = makeRecord(dataB)
    const savedRecordA = await storage.write(recordA);
    const savedRecordB = await storage.write(recordB);

    expect(recordA.getId()).not.toBeNull();
    expect(recordA.getId()).toEqual(savedRecordA.getId());

    expect(savedRecordA.getId()).toEqual(0);
    expect(savedRecordA.getData()).toEqual(dataA);

    expect(savedRecordB.getId()).toEqual(1);
    expect(savedRecordB.getData()).toEqual(dataB);
  });

  test('read()', async () => {
    const recordA = makeRecord(dataA);
    const recordB = makeRecord(dataB)

    await storage.write(recordA);
    const savedRecordB = await storage.write(recordB);

    const fetchedRecordB = await storage.read(recordB.getId());

    expect(savedRecordB.getId()).toEqual(fetchedRecordB.getId());
    expect(savedRecordB.getData()).toEqual(fetchedRecordB.getData());
  });

  test('write() - concurrency', async () => {
    const recordA = makeRecord(dataA);
    const savedRecordA1 = await storage.write(recordA);
    const savedRecordA2 = await storage.read(recordA.getId());

    await storage.write(savedRecordA1);
    savedRecordA2.setData(dataB);
    await storage.write(savedRecordA2)

    const savedRecord = await storage.read(savedRecordA1.getId());

    expect(savedRecord.getId()).toEqual(savedRecordA2.getId());
    expect(savedRecord.getData()).toEqual(savedRecordA2.getData());
  });
});
