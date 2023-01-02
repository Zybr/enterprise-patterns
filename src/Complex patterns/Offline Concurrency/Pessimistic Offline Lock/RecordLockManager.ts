import RecordLockStorage from "./Storage/RecordLockStorage";
import LockableRecord from "./Storage/LockableRecord";
import ILockManager from "./ILockManager";

export default class RecordLockManager implements ILockManager {
  public constructor(
    private readonly storage: RecordLockStorage,
  ) {
  }

  public lock(id: number): LockableRecord {
    const record = this.storage.read(id);
    this.checkRecordExisted(id, record);
    this.checkRecordNotLocked(record);

    return this.storage.write(record.lock());
  }

  public unlock(id: number): LockableRecord {
    const record = this.storage.read(id);
    this.checkRecordExisted(id, record);

    return this.storage.write(record.unlock());
  }

  private checkRecordExisted(id: number, record: LockableRecord | null): LockableRecord {
    if (!record) {
      throw new Error(`Record with id ${id} is not defined.`);
    }
    return record;
  }

  private checkRecordNotLocked(record: LockableRecord): LockableRecord {
    if (record.isLocked()) {
      throw new Error(`Record with id ${record.getId()} is already locked.`);
    }
    return record;
  }
}
