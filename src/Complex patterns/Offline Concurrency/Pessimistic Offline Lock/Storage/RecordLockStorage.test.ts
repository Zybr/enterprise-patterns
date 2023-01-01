import RecordLockStorage from "./RecordLockStorage";
import { makeLockableRecord } from "./utils/tests";

describe('RecordLockStorage', () => {
  const storage = new RecordLockStorage(__dirname + '/data.txt')

  beforeEach(async () => await storage.clear());

  test('write(); read();', async () => {
    const record = makeLockableRecord();

    // Default
    await storage.write(record);
    expect(
      (await storage.read(record.getId()))
        .isLocked()
    )
      .toBeFalsy();

    // Lock
    record.lock();
    await storage.write(record);
    expect(
      (await storage.read(record.getId()))
        .isLocked()
    )
      .toBeTruthy();

    // Unlock
    record.unlock();
    await storage.write(record);
    expect(
      (await storage.read(record.getId()))
        .isLocked()
    ).toBeFalsy();
  });

  test('refresh()', async () => {
    const storageA = new RecordLockStorage(__dirname + '/data.txt')
    const storageB = new RecordLockStorage(__dirname + '/data.txt')

    const recordA = await storage.write(makeLockableRecord());
    const recordB = await storageB.read(recordA.getId());
    await storageB.write(
      recordB.setData(
        makeLockableRecord().getData()
      )
    );

    expect((await storageA.refresh(recordA)).getData())
      .toEqual(recordB.getData())
  });
});
