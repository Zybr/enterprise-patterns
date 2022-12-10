import ICache from "../Cache/ICache";
import StatisticsRecord from "./Types/StatisticsRecord";

export default class CacheStatistics implements ICache {
  private readonly cache: ICache;
  private readonly statistics: { [key: string]: StatisticsRecord } = {}

  public constructor(cache: ICache) {
    this.cache = cache;
  }

  public clear(): void {
    for (const key in this.statistics) {
      this.updateRemoveTime(key);
    }

    return this.cache.clear();
  }

  public get(key: string): any {
    return this.cache.get(key);
  }

  public has(key: string): boolean {
    return this.cache.has(key);
  }

  public put(key: string, value: any): any {
    this.updatePutTime(key)

    return this.cache.put(key, value);
  }

  public remove(key: string): void {
    this.updateRemoveTime(key)

    return this.cache.remove(key);
  }

  public getLastPut(key: string): null | number {
    return this.statistics[key]?.put ?? null
  }

  public getLastRemove(key: string): null | number {
    return this.statistics[key]?.remove ?? null
  }

  private updatePutTime(key: string): void {
    const record = this.makeRecord(key);
    record.put = new Date().getTime();
    this.statistics[key] = record;
  }

  private updateRemoveTime(key: string): void {
    if (this.cache.has(key)) {
      const record = this.makeRecord(key);
      record.remove = new Date().getTime();
      this.statistics[key] = record;
    }
  }

  private makeRecord(key: string): StatisticsRecord {
    return this.statistics[key] ?? {
      put: null,
      remove: null,
    }
  }
}
