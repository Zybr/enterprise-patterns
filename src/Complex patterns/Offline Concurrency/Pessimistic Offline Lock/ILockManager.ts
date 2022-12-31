export default interface ILockManager {
  lock(id): Promise<any>;

  unlock(id): Promise<any>;
}
