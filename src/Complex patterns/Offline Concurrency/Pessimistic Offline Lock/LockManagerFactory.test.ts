import LockManagerFactory from "./LockManagerFactory";
import ResourceType from "./Enums/ResourceType";
import RecordLockManager from "./RecordLockManager";

describe('LockManagerFactory', () => {
  const factory = new LockManagerFactory(__dirname + '/data.txt');

  test('getLockManager()', () => {
    expect(factory.getLockManager(ResourceType.FileRecord))
      .toBeInstanceOf(RecordLockManager)
  });
});
