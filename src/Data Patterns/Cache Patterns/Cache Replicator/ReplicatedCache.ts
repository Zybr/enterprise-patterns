import ICache from "../Cache/ICache";
import IChangesObserver from "./Observers/IChangesObserver";

export default class ReplicatedCache implements ICache {
  private readonly cache: ICache;
  private readonly observers: IChangesObserver[] = [];

  public constructor(cache: ICache) {
    this.cache = cache;
  }

  public get(key: string): any {
    return this.cache.get(key);
  }

  public has(key: string): boolean {
    return this.cache.has(key);
  }

  public put(key: string, value: any): any {
    this.observers.forEach(observer => observer.put({key, value}))
    return this.cache.put(key, value);
  }

  public remove(key: string): void {
    this.observers.forEach(observer => observer.removed({key}))
    return this.cache.remove(key);
  }

  public clear(): void {
    this.observers.forEach(observer => observer.cleared({}))
    this.cache.clear();
  }

  public register(observer: IChangesObserver): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }
}
