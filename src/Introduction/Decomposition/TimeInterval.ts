export default class TimeInterval {
  public constructor(
    private readonly start: Date,
    private readonly end: Date,
  ) {
  }

  public getStart(): Date {
    return this.start;
  }

  public getEnd(): Date {
    return this.end;
  }
}
