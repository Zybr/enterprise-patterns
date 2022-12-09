import Cache from "./Cache";
import { faker } from '@faker-js/faker';

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
});
