export default class Record {
  private id: number = null;
  private version: number = 0;
  private data: any;

  getId(): number | null {
    return this.id;
  }

  setId(value: number): this {
    this.id = value;
    return this;
  }

  getVersion(): number {
    return this.version;
  }

  setVersion(value: number): this {
    this.version = value;
    return this;
  }

  incrementVersion(): this {
    this.setVersion(this.getVersion() + 1);
    return this;
  }

  getData(): any {
    return this.data;
  }

  setData(value: any): this {
    this.data = value;

    return this;
  }
}
