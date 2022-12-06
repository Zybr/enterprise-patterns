import IResource from "./IResource";
import ResourcePool from "./ResourcePool";

export default class PulledResource implements IResource {
  private readonly pool: ResourcePool;
  private db: IResource | null;

  public constructor(pool: ResourcePool, db: IResource) {
    this.pool = pool;
    this.db = db;
  }

  public selectOne(sql: string, params: []): Promise<[] | null> {
    this.checkStatus();

    return this.db.selectOne(sql, params);
  }

  public close(): this {
    this.pool.releaseDb(this.db);
    this.db = null;
    return this;
  }

  private checkStatus(): void {
    if (!this.db) {
      throw new Error('Resource is closed.');
    }
  }
}
