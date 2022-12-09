import Cache from "./Cache";
import { faker } from '@faker-js/faker';
import { pause } from "../../utils/utils";

describe('Cache', () => {
  let cache: Cache;
  const key = faker.word.noun();
  const value = faker.word.noun();

  beforeEach(() => cache = new Cache());

  test('put() & get()', () => {
    cache.put(key, value);

    expect(cache.get(key)).toEqual(value);
  });

  test('has()', () => {
    expect(cache.has(key)).toBeFalsy();

    cache.put(key, value);

    expect(cache.has(key)).toBeTruthy();
  });

  test('remove()', () => {
    cache.put(key, value);
    cache.remove(key);

    expect(cache.get(key)).toBeUndefined();
  });

  test('clear()', () => {
    cache.put(key, value);
    cache.clear();

    expect(cache.get(key)).toBeUndefined();
  });

  test('keys()', () => {
    cache.put('a', 1)
    cache.put('b', 1)
    cache.put('c', 1)
    cache.remove('b');

    expect(cache.keys()).toEqual(['a', 'c']);
  });

  test('lastUse', async () => {
    // Key A

    const keyA = 'a';
    const timeA = new Date().getTime();

    cache.put(keyA, 1);

    await pause(100)
    expect(cache.lastUse(keyA)).toEqual(timeA);

    // Key B

    const keyB = 'b';
    const timeB = new Date().getTime();

    cache.put(keyB, 1);

    await pause(100)
    expect(cache.lastUse(keyB)).toEqual(timeB);
  });
});
