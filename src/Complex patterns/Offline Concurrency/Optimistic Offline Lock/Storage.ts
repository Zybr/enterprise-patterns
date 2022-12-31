import Record from "./Record";
import ILine from "./ILine";
import { default as BaseStorage } from "../generic/Storage/Storage";

export default class Storage extends BaseStorage<Record, ILine> {
  public write(record: Record): Promise<Record> {
    record.setId(record.getId() !== null ? record.getId() : this.lines.length);

    return this.getLines()
      .then(lines => {
        if (lines[record.getId()] && lines[record.getId()].version !== record.getVersion()) {
          throw new Error(`Passed version is out of date: ${record.getVersion()} < ${lines[record.getId()].version}`);
        }
        record.incrementVersion();
      })
      .then(() => super.write(record))
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
