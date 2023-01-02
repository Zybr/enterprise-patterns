import RecordLockStorage from "./RecordLockStorage";
import { makeLockableRecord } from "./utils/tests";

describe('RecordLockStorage', () => {
  const storage = new RecordLockStorage(__dirname + '/data.txt')

  beforeEach(() => storage.clear());

  test('write(); read();', () => {
    const record = makeLockableRecord();

    // Default
    storage.write(record);
    expect(
      (storage.read(record.getId()))
        .isLocked()
    )
      .toBeFalsy();

    // Lock
    record.lock();
    storage.write(record);
    expect(
      (storage.read(record.getId()))
        .isLocked()
    )
      .toBeTruthy();

    // Unlock
    record.unlock();
    storage.write(record);
    expect(
      (storage.read(record.getId()))
        .isLocked()
    ).toBeFalsy();
  });

  test('refresh()', () => {
    const storageA = new RecordLockStorage(__dirname + '/data.txt')
    const storageB = new RecordLockStorage(__dirname + '/data.txt')

    const recordA = storage.write(makeLockableRecord());
    const recordB = storageB.read(recordA.getId());
    storageB.write(
      recordB.setData(
        makeLockableRecord().getData()
      )
    );

    expect(storageA.refresh(recordA).getData())
      .toEqual(recordB.getData())
  });
});
