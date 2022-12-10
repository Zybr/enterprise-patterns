import Record from "./Record";

export default class Cache {
  private container = new Map<string, Record>();

  public get(key: string): any | undefined {
    if (!this.has(key)) {
      return undefined;
    }

    return this.container.get(key).value;
  }

  public put(key: string, value: any): any {
    this.container.set(key, {value, lastUse: null});
    this.updateLastUse(key);

    return this.get(key);
  }

  public has(key: string): boolean {
    this.updateLastUse(key);

    return this.container.has(key);
  }

  public remove(key: string): void {
    this.container.delete(key);
  }

  public clear(): void {
    this.container.clear();
  }

  public keys(): string[] {
    return Array.from(this.container.keys());
  }

  public lastUse(key: string): number | null {
    return this.container.get(key)?.lastUse ?? null;
  }

  private updateLastUse(key: string): void {
    if (!this.container.has(key)) {
      return;
    }

    this.container.get(key).lastUse = new Date().getTime();
  }
}
