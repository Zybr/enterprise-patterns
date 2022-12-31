export default class Record {
  private id: number = null;
  private data: any;

  getId(): number | null {
    return this.id;
  }

  setId(value: number): this {
    this.id = value;
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
