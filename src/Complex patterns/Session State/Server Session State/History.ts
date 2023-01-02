import * as fs from 'fs';

export default class History {
  private readonly RECORD_SPLITTER = '\n'

  constructor(
    private readonly dirName: string,
  ) {
  }

  public add(id: string, data: Object): void {
    fs.writeFileSync(
      this.getFilePath(id),
      this.RECORD_SPLITTER + JSON.stringify(data),
      {flag: 'a+'}
    );
  }

  public list(id: string): {}[] {
    return fs.readFileSync(
      this.getFilePath(id),
      {encoding: 'utf8'}
    )
      .split(this.RECORD_SPLITTER)
      .filter(line => line.length)
      .map(line => JSON.parse(line));
  }

  public clear(id: string): void {
    fs.writeFileSync(
      this.getFilePath(id),
      '',
      {flag: 'w'}
    );
  }

  protected getFilePath(sessionId: string): string {
    return `${this.dirName}${sessionId}.txt`;
  }
}
