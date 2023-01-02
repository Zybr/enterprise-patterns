import * as fs from 'fs';
import Record from "./Record";
import ILine from "./ILine";
import IStorage from "./IStorage";

export default class Storage<R extends Record, L extends ILine> implements IStorage<R> {
  private readonly RECORD_SPLITTER = '\n'
  protected readonly fileName: string;
  protected lines: L[] = [];

  public constructor(fileName: string) {
    this.fileName = fileName;
  }

  public read(id: number): R | null {
    const line = this.fetchLines()[id];
    return line ? this.lineToRecord(id, line) : null;
  }

  public write(record: R): R {
    if (record.getId() === -1) {
      throw new Error('Record is detached from ORM');
    }

    record.setId(record.getId() !== null ? record.getId() : this.lines.length);
    this.fetchLines();
    this.lines[record.getId()] = this.recordToLine(record);

    fs.writeFileSync(
      this.fileName,
      this.lines
        .map(line => JSON.stringify(line))
        .join(this.RECORD_SPLITTER),
      {flag: 'w+'}
    );

    return record;
  }

  public clear(): void {
    // TODO: Reset IDs of produced records
    fs.writeFileSync(
      this.fileName,
      '',
      {flag: 'w+'}
    );
    this.lines = [];
  }

  protected fetchLines(): L[] {
    return this.lines = fs.readFileSync(
      this.fileName,
      {encoding: 'utf8'}
    )
      .split(this.RECORD_SPLITTER)
      .filter(line => line.length)
      .map(line => JSON.parse(line));
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
