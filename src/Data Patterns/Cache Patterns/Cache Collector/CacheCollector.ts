import Cache from "./Cache";

export default class CacheCollector {
  public constructor(
    private readonly cache: Cache,
    private readonly lifeTime: number,
  ) {
  }

  public collect(): void {
    for (const key of this.cache.keys()) {
      const lastUse = this.cache.lastUse(key);
      const lasAllowed = new Date().getTime() - this.lifeTime;

      if (
        this.cache.has(key)
        && (lastUse <= lasAllowed)
      ) {
        this.cache.remove(key);
      }
    }
  }
}
