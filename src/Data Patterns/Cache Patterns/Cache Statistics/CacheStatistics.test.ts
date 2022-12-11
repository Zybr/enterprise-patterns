import CacheStatistics from "./CacheStatistics";
import Cache from "../Cache/Cache";
import { pause } from "../../utils/utils";

describe('CacheStatistics', () => {
  const now = () => new Date().getTime();

  test('getLastPut() & getLastRemove()', () => {
    const cache = new CacheStatistics(new Cache);
    const key = 'key';
    const value = 'value';
    let putTime: number;
    let removeTime: number;

    expect(cache.getLastPut(key)).toBeNull();
    expect(cache.getLastRemove(key)).toBeNull();

    cache.put(key, value);
    pause(100);
    putTime = now();
    cache.put(key, value);
    pause(100);
    expect(cache.getLastPut(key)).toEqual(putTime);
    expect(cache.getLastRemove(key)).toBeNull();

    removeTime = now();
    cache.remove(key)
    pause(100)
    cache.remove(key)
    pause(200)
    expect(cache.getLastPut(key)).toEqual(putTime);
    expect(cache.getLastRemove(key)).toEqual(removeTime);

    cache.put(key, value);
    pause(100);
    putTime = now();
    cache.put(key, value);
    pause(100);
    removeTime = now();
    cache.clear();
    expect(cache.getLastPut(key)).toEqual(putTime);
    expect(cache.getLastRemove(key)).toEqual(removeTime);
  })
});
