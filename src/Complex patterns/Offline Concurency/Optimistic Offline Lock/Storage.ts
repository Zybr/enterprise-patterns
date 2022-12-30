import * as fs from 'fs';
import Record from "./Record";
import ILine from "./ILine";

const open = fs.promises.open;

export default class Storage {
  private readonly fileName: string;
  private lines: ILine[] = [];

  public constructor(fileName: string) {
    this.fileName = fileName;
  }

  public read(id: number): Promise<Record | null> {
    return this.getLines()
      .then(lines => lines[id])
      .then(line => line ? this.lineToRecord(id, line) : null);
  }

  public write(record: Record): Promise<Record> {
    record.setId(record.getId() !== null ? record.getId() : this.lines.length);

    return this.getLines()
      .then(lines => {
        if (lines[record.getId()] && lines[record.getId()].version !== record.getVersion()) {
          throw new Error(`Passed version is out of date: ${record.getVersion()} < ${lines[record.getId()].version}`);
        }

        lines[record.getId()] = this.recordToLine(record.incrementVersion())
      })
      .then(() => open(this.fileName, 'w'))
      .then(file => {
        file.write(
          this.lines
            .map(line => JSON.stringify(line))
            .join("\n")
        );
        file.close();
      })
      .then(() => record);
  }

  public clear() {
    // TODO: Reset IDs and versions of produced records
    return open(this.fileName, 'w')
      .then(file => this
        .getLines()
        .then(() => file.close())
      );
  }

  private getLines(): Promise<ILine[]> {
    return open(this.fileName, 'a+')
      .then(
        async (file) => {
          this.lines = [];
          for await (const line of file.readLines()) {
            this.lines.push(JSON.parse(line));
          }

          file.close();
          return this.lines;
        }
      );
  }

  private lineToRecord(id: number, line: ILine): Record {
    return (new Record())
      .setId(id)
      .setVersion(line.version)
      .setData(line.data)
  }

  private recordToLine(record: Record): any {
    return {
      version: record.getVersion(),
      data: record.getData(),
    }
  }
}
