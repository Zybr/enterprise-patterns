import Storage from "./Storage";
import Record from "./Record";
import { faker } from "@faker-js/faker";
import { assertReject } from "../../../utils/tests";

const makeRecord = (data: any): Record => new Record().setData(data);

// describe('Storage', () => {
describe.skip('Storage', () => { // Jest is not configured to work with FS
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
    expect(savedRecordA.getVersion()).toEqual(1);
    expect(savedRecordA.getData()).toEqual(dataA);

    expect(savedRecordB.getId()).toEqual(1);
    expect(savedRecordB.getVersion()).toEqual(1);
    expect(savedRecordB.getData()).toEqual(dataB);
  });

  test('write() - version', async () => {
    const recordA = makeRecord(dataA);

    await storage.write(recordA);
    expect(recordA.getVersion()).toEqual(1);

    recordA.setData(dataB);
    await storage.write(recordA);
    expect(recordA.getVersion()).toEqual(2);

    await storage.write(recordA);
    expect(recordA.getVersion()).toEqual(3);
  });

  test('read()', async () => {
    const recordA = makeRecord(dataA);
    const recordB = makeRecord(dataB)

    await storage.write(recordA);
    const savedRecordB = await storage.write(recordB);

    const fetchedRecordB = await storage.read(recordB.getId());

    expect(savedRecordB.getId()).toEqual(fetchedRecordB.getId());
    expect(savedRecordB.getVersion()).toEqual(fetchedRecordB.getVersion());
    expect(savedRecordB.getData()).toEqual(fetchedRecordB.getData());
  });

  test('write() - concurrency', async () => {
    const recordA = makeRecord(dataA);
    const storedRecordA1 = await storage.write(recordA);
    const storedRecordA2 = await storage.read(recordA.getId());

    storedRecordA2.setData(dataB);
    await storage.write(storedRecordA2)

    await assertReject(
      storage.write(storedRecordA1),
      'Passed version is out of date: 1 < 2'
    );
  });
});
