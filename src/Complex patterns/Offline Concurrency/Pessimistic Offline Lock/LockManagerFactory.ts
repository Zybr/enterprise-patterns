import ResourceType from "./Enums/ResourceType";
import ILockManager from "./ILockManager";
import RecordLockManager from "./RecordLockManager";
import RecordLockStorage from "./Storage/RecordLockStorage";

export default class LockManagerFactory {
  public getLockManager(resourceType: ResourceType): ILockManager {
    switch (resourceType) {
      case ResourceType.FileRecord:
        return new RecordLockManager(new RecordLockStorage(__dirname + '/data.txt'));
      default:
        throw new Error('Lock manager is not defined.')
    }
  }
}
