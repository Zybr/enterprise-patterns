import ICache from "./ICache";

export default class Cache implements ICache {
  private container: { [key: string]: any } = {}

  public get(key: string): any | undefined {
    return this.container[key] ?? undefined;
  }

  public put(key: string, value: any): any {
    return this.container[key] = value;
  }

  public has(key: string): boolean {
    return this.container[key] !== undefined;
  }

  public remove(key: string): void {
    delete (this.container[key]);
  }

  public clear(): void {
    this.container = {};
  }
}
