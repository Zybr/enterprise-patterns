import Cache from "../Cache/Cache";
import ReplicatedCache from "./ReplicatedCache";
import ReplicatorObserver from "./Observers/ReplicatorObserver";

describe('ReplicateCache', () => {
  test('Listen and copy changes', () => {
    const cacheA = new ReplicatedCache(new Cache());
    const cacheB = new Cache()
    const cacheBReplicator = new ReplicatorObserver(cacheB);
    const key = 'key';
    const value = 'value';

    cacheA.register(cacheBReplicator);

    cacheA.put(key, value);
    expect(cacheB.get(key)).toEqual(value);

    cacheB.remove(key);
    expect(cacheB.get(key)).toBeUndefined();

    cacheA.put(key, value);
    cacheA.clear();
    expect(cacheB.get(key)).toBeUndefined();
  });
});
