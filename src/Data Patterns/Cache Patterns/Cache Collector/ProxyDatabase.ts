import { IDatabase } from "../IDatabase";
import Database from "../Database";
import Row from "../Row";
import Cache from "./Cache";
import CacheCollector from "./CacheCollector";
import Timer from "../../utils/Timer";

export default class ProxyDatabase implements IDatabase {
  private readonly collector: CacheCollector;
  private readonly timer: Timer;
  private readonly lifeTime = 100;
  private readonly collectInterval = 100;

  public constructor(
    private readonly database: Database,
    private readonly cache: Cache,
  ) {
    this.collector = new CacheCollector(this.cache, this.lifeTime);
    this.timer = new Timer(() => this.collector.collect())
      .reset(this.collectInterval)
  }

  public getRow(inx: number): Row {
    const key = '' + inx;

    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    return this.cache.put(
      key,
      this.database.getRow(inx)
    );
  }

  /** Release timer */
  public stopAutoClear(): void {
    this.timer.stop();
  }
}
