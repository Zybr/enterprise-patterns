import { default as BaseStorage } from "../../generic/Storage/Storage";
import ILockableLine from "./ILockableLine";
import LockableRecord from "./LockableRecord";

export default class RecordLockStorage extends BaseStorage<LockableRecord, ILockableLine> {
  public refresh(record): LockableRecord {
    const storedRecord = this.read(record.id)

    if (!storedRecord) {
      throw new Error(`Record with id ${record.id} is not defined.`)
    }

    record.setData(storedRecord.getData());
    record.setLocked(storedRecord.isLocked());
    return record;
  }

  protected lineToRecord(id: number, line: ILockableLine): LockableRecord {
    return (new LockableRecord())
      .setId(id)
      .setLocked(line.isLocked || false)
      .setData(line.data)
  }

  protected recordToLine(record: LockableRecord): ILockableLine {
    return {
      isLocked: record.isLocked(),
      data: record.getData(),
    }
  }
}
