export default class History {
  private readonly history: {}[] = [];

  public add(data: Object): void {
    this.history.push(data);
  }

  public list(): {}[] {
    return this.history;
  }
}
