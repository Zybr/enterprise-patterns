import LockManagerFactory from "./LockManagerFactory";
import ResourceType from "./Enums/ResourceType";
import RecordLockStorage from "./Storage/RecordLockStorage";
import RecordLockManager from "./RecordLockManager";
import { assertReject } from "../../../utils/tests";
import { makeLockableRecord } from "./Storage/utils/tests";

describe('RecordLockManager', () => {
  const fileName = __dirname + '/data.txt';
  const storage = (new RecordLockStorage(fileName));
  const lockMgr = (new LockManagerFactory(fileName)).getLockManager(ResourceType.FileRecord) as RecordLockManager;

  beforeEach(async () => await storage.clear());

  test('lock() - not existed', async () => {
    const id = Math.pow(10, 3);
    await assertReject(
      lockMgr.lock(id),
      `Record with id ${id} is not defined.`
    );
  });

  test('unlock() - not existed', async () => {
    const id = Math.pow(10, 3);
    await assertReject(
      lockMgr.unlock(id),
      `Record with id ${id} is not defined.`
    );
  });

  test('lock(); unlock();', async () => {
    let record = await storage.write(makeLockableRecord())

    // Lock
    record = await lockMgr.lock(record.getId());

    expect(record.isLocked()).toBeTruthy();
    expect(
      (await storage.read(record.getId()))
        .isLocked()
    )
      .toBeTruthy();

    // Unlock
    record = await lockMgr.unlock(record.getId());

    expect(record.isLocked()).toBeFalsy();
    expect(
      (await storage.read(record.getId()))
        .isLocked()
    ).toBeFalsy();
  });

  test('lock() - concurrency', async () => {
    let record = await storage.write(makeLockableRecord())

    // Lock
    record = await lockMgr.lock(record.getId());

    await assertReject(
      lockMgr.lock(record.getId()),
      `Record with id ${record.getId()} is already locked.`
    )
  });
});
