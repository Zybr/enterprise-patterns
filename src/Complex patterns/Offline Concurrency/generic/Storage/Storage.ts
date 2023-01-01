import * as fs from 'fs';
import Record from "./Record";
import ILine from "./ILine";
import IStorage from "./IStorage";

const open = fs.promises.open;

export default class Storage<R extends Record, L extends ILine> implements IStorage<R> {
  protected readonly fileName: string;
  protected lines: L[] = [];

  public constructor(fileName: string) {
    this.fileName = fileName;
  }

  public read(id: number): Promise<R | null> {
    return this.getLines()
      .then(lines => lines[id])
      .then(line => line ? this.lineToRecord(id, line) : null);
  }

  public write(record: R): Promise<R> {
    if (record.getId() === -1) {
      throw new Error('Record is detached from ORM');
    }

    record.setId(record.getId() !== null ? record.getId() : this.lines.length);

    return this.getLines()
      .then(lines => lines[record.getId()] = this.recordToLine(record))
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

  public clear(): Promise<void> {
    // TODO: Reset IDs of produced records
    return open(this.fileName, 'w')
      .then(file => this
        .getLines()
        .then(() => file.close())
      );
  }

  protected getLines(): Promise<L[]> {
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

  protected lineToRecord(id: number, line: L): R {
    return (new Record())
      .setId(id)
      .setData(line.data) as R
  }

  protected recordToLine(record: R): L {
    return {
      data: record.getData(),
    } as L
  }
}
