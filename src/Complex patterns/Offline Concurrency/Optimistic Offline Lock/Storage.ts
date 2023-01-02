import Record from "./Record";
import ILine from "./ILine";
import { default as BaseStorage } from "../generic/Storage/Storage";

export default class Storage extends BaseStorage<Record, ILine> {
  public write(record: Record): Record {
    record.setId(record.getId() !== null ? record.getId() : this.lines.length);

    this.fetchLines();

    if (this.lines[record.getId()] && this.lines[record.getId()].version !== record.getVersion()) {
      throw new Error(`Passed version is out of date: ${record.getVersion()} < ${this.lines[record.getId()].version}`);
    }
    record.incrementVersion();

    return super.write(record);
  }

  protected lineToRecord(id: number, line: ILine): Record {
    return (new Record())
      .setId(id)
      .setVersion(line.version)
      .setData(line.data)
  }

  protected recordToLine(record: Record): ILine {
    return {
      version: record.getVersion(),
      data: record.getData(),
    }
  }
}
