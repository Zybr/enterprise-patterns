import Repository from "./Repository";
import Storage from "../../generic/Storage/Storage";
import LockManagerFactory from "../../Pessimistic Offline Lock/LockManagerFactory";
import ResourceType from "../../Pessimistic Offline Lock/Enums/ResourceType";
import { makeRecord } from "../../Pessimistic Offline Lock/Storage/utils/tests";
import { assertReject } from "../../../../utils/tests";

describe('Repository', () => {
  const fileName = __dirname + '/data.txt';
  const storage = new Storage(fileName)
  const lockMgr = (new LockManagerFactory(fileName)).getLockManager(ResourceType.FileRecord);
  const repositoryA = new Repository(storage, lockMgr);
  const repositoryB = new Repository(storage, lockMgr);

  beforeEach(async () => await storage.clear());

  test('read()', async () => {
    let record = await storage.write(makeRecord());
    await repositoryA.read(record.getId());

    expect(record.getId()).toEqual(record.getId());
    expect(record.getData()).toEqual(record.getData());
  });

  test('write()', async () => {
    const record = makeRecord();
    await repositoryA.write(record);

    expect(record.getId()).not.toBeNull();
  });

  test('read() - concurrency', async () => {
    let record = await storage.write(makeRecord());
    await repositoryA.read(record.getId());
    await assertReject(
      repositoryB.read(record.getId()),
      `Record with id ${record.getId()} is already locked.`
    );
  });
});
