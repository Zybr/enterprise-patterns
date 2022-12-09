import IResource from "./IResource";
import ResourcePool from "./ResourcePool";
import Timer from "../../utils/Timer";

export default class PulledResource implements IResource {
  private readonly pool: ResourcePool;
  private db: IResource | null;
  private readonly LIFE_TIME = 1000; // 1 second
  private readonly timer: Timer;

  public constructor(pool: ResourcePool, db: IResource) {
    this.pool = pool;
    this.db = db;
    this.timer = new Timer(this.close.bind(this));
  }

  public selectOne(sql: string, params: []): Promise<[] | null> {
    this.syncStatus();

    return this.db.selectOne(sql, params);
  }

  public close(): this {
    this.pool.releaseDb(this.db);
    this.db = null;
    this.timer.stop();

    return this;
  }

  private syncStatus(): void {
    if (!this.db) {
      throw new Error('Resource is closed.');
    }

    this.timer.reset(this.LIFE_TIME);
  }
}
