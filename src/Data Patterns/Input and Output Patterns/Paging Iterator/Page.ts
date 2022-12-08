export default class Page<T> {
  private readonly models: T[];

  public constructor(models: T[]) {
    this.models = models;
  }

  public get size(): number {
    return this.models.length;
  }

  public get(index: number): T | null {
    return this.models[index] ?? null;
  }
}
