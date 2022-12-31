import Storage from "./Storage";
import Record from "./Record";
import { faker } from "@faker-js/faker";
import { assertReject } from "../../../utils/tests";

const makeRecord = (data: any): Record => new Record().setData(data);

describe('Storage', () => {
  const storage = new Storage(__dirname + '/data.txt')
  const dataA = {value: faker.word.noun()};
  const dataB = {value: faker.word.noun()};

  beforeEach(async () => await storage.clear());

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
