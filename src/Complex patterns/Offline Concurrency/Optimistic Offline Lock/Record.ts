import { default as BaseRecord } from "../generic/Storage/Record";

export default class Record extends BaseRecord {
  private version: number = 0;

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
}
