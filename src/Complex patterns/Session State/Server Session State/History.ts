import * as fs from 'fs';

const open = fs.promises.open;

export default class History {
  private readonly RECORD_SPLITTER = '\n'

  constructor(
    private readonly fileName: string,
  ) {
  }

  public add(data: Object): void {
    fs.writeFileSync(
      this.fileName,
      this.RECORD_SPLITTER + JSON.stringify(data),
      {flag: 'a'}
    );
  }

  public list(): {}[] {
    return fs.readFileSync(
      this.fileName,
      {encoding: 'utf8'}
    )
      .split(this.RECORD_SPLITTER)
      .filter(line => line.length)
      .map(line => JSON.parse(line));
  }

  public clear(): Promise<void> {
    return open(this.fileName, 'w')
      .then(file => file.close())
  }
}
