export default interface ICache {
  get(key: string): any | undefined;

  put(key: string, value: any): any;

  has(key: string): boolean;

  remove(key: string): void;

  clear(): void;
}
