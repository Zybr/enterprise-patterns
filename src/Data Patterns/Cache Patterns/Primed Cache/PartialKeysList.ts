import { Md5 } from 'ts-md5';

export default class PartialKeysList {
  private readonly keys = new Set<string>();

  public add(key: string): void {
    const partialKey = this.makePartialKey(key);
    this.keys.add(partialKey);
  }

  public has(key: string): boolean {
    const partialKey = this.makePartialKey(key);
    return this.keys.has(partialKey);
  }

  private makePartialKey(key: string): string {
    return Md5.hashStr(key).slice(0, 5);
  }
}
