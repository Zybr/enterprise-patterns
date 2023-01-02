import LockManagerFactory from "./LockManagerFactory";
import ResourceType from "./Enums/ResourceType";
import RecordLockStorage from "./Storage/RecordLockStorage";
import RecordLockManager from "./RecordLockManager";
import { makeLockableRecord } from "./Storage/utils/tests";

describe('RecordLockManager', () => {
  const fileName = __dirname + '/data.txt';
  const storage = (new RecordLockStorage(fileName));
  const lockMgr = (new LockManagerFactory(fileName)).getLockManager(ResourceType.FileRecord) as RecordLockManager;

  beforeEach(() => storage.clear());

  test('lock() - not existed', () => {
    const id = Math.pow(10, 3);
    expect(() => lockMgr.lock(id))
      .toThrow(`Record with id ${id} is not defined.`);
  });

  test('unlock() - not existed', () => {
    const id = Math.pow(10, 3);
    expect(() => lockMgr.unlock(id))
      .toThrow(`Record with id ${id} is not defined.`);
  });

  test('lock(); unlock();', () => {
    let record = storage.write(makeLockableRecord())

    // Lock
    record = lockMgr.lock(record.getId());

    expect(record.isLocked()).toBeTruthy();
    expect(
      (storage.read(record.getId()))
        .isLocked()
    )
      .toBeTruthy();

    // Unlock
    record = lockMgr.unlock(record.getId());

    expect(record.isLocked()).toBeFalsy();
    expect(
      (storage.read(record.getId()))
        .isLocked()
    ).toBeFalsy();
  });

  test('lock() - concurrency', () => {
    let record = storage.write(makeLockableRecord())

    // Lock
    record = lockMgr.lock(record.getId());

    expect(() => lockMgr.lock(record.getId()))
      .toThrow(`Record with id ${record.getId()} is already locked.`);
  });
});
