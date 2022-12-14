export default class Department {
  private name: string | null;
  private parent: Department | null;

  public setName(name: string): this {
    this.name = name;

    return this;
  }

  public getName(): string | null {
    return this.name;
  }

  public setParent(department: Department): this {
    this.parent = department;

    return this;
  }

  public getParent(): Department | null {
    return this.parent;
  }
}
