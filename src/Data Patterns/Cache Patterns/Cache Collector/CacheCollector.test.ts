import Cache from "./TimedCache/Cache";
import CacheCollector from "./CacheCollector";
import { pause } from "../../utils/utils";

describe('CacheController', () => {
  const cache = new Cache();
  const controller = new CacheCollector(cache, 100);

  test('collect()', async () => {
    const key = 'a';

    cache.put(key, 1);

    await pause(50)
    controller.collect();
    expect(cache.has(key)).toBeTruthy()

    await pause(150)
    controller.collect();
    expect(cache.has(key)).toBeFalsy()
  });
});
