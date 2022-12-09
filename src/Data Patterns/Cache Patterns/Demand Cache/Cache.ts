export default class Cache {
  private container: { [key: string]: any } = {}

  public get(key: string): any | undefined {
    return this.container[key] ?? undefined;
  }

  public put(key: string, data: any): any {
    return this.container[key] = data;
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
