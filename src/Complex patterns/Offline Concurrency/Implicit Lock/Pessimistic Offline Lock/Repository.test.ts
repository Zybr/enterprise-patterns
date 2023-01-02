import Repository from "./Repository";
import Storage from "../../generic/Storage/Storage";
import LockManagerFactory from "../../Pessimistic Offline Lock/LockManagerFactory";
import ResourceType from "../../Pessimistic Offline Lock/Enums/ResourceType";
import { makeRecord } from "../../Pessimistic Offline Lock/Storage/utils/tests";

describe('Repository', () => {
  const fileName = __dirname + '/data.txt';
  const storage = new Storage(fileName)
  const lockMgr = (new LockManagerFactory(fileName)).getLockManager(ResourceType.FileRecord);
  const repositoryA = new Repository(storage, lockMgr);
  const repositoryB = new Repository(storage, lockMgr);

  beforeEach(() => storage.clear());

  test('read()', () => {
    let record = storage.write(makeRecord());
    repositoryA.read(record.getId());

    expect(record.getId()).toEqual(record.getId());
    expect(record.getData()).toEqual(record.getData());
  });

  test('write()', () => {
    const record = makeRecord();
    repositoryA.write(record);

    expect(record.getId()).not.toBeNull();
  });

  test('read() - concurrency', () => {
    let record = storage.write(makeRecord());
    repositoryA.read(record.getId());
    expect(() => repositoryB.read(record.getId()))
      .toThrow(`Record with id ${record.getId()} is already locked.`);
  });
});
