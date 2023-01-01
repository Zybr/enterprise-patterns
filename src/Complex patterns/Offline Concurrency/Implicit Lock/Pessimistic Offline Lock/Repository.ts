import IStorage from "../../generic/Storage/IStorage";
import Record from "../../generic/Storage/Record";
import Storage from "../../generic/Storage/Storage";
import ILine from "../../generic/Storage/ILine";
import ILockManager from "../../Pessimistic Offline Lock/ILockManager";

export default class Repository implements IStorage<Record> {
  private readonly locked = new Set<number>();

  public constructor(
    private readonly storage: Storage<Record, ILine>,
    private readonly lockMgr: ILockManager
  ) {
  }

  public read(id: number): Promise<Record | null> {
    return this.storage
      .read(id)
      .then(
        record => record
          ? this.lock(record)
          : record
      );
  }

  public write(record: Record): Promise<Record> {
    return this.storage
      .write(record)
      .then(
        record => this.lockMgr
          .unlock(record.getId())
          .then(() => {
            this.locked.delete(record.getId());
            record.setId(-1); // Detach record from storage. It requires client to fetch/lock record again.
            return record;
          })
      )
  }

  public clear(): Promise<void> {
    return this.storage.clear();
  }

  private lock(record: Record): Promise<Record> {
    if (this.locked.has(record.getId())) {
      return Promise.resolve(record);
    }

    return this.lockMgr
      .lock(record.getId())
      .then(() => {
        this.locked.add(record.getId());
        return record;
      });
  }
}
