export default class DateRange {
  private readonly start: Date;
  private readonly end: Date;

  public constructor(start: Date, end: Date) {
    this.start = new Date(start);
    this.end = new Date(end);
  }

  public getStart(): Date {
    return new Date(this.start);
  }

  public getEnd(): Date {
    return new Date(this.end);
  }

  public duration(): Date {
    return new Date(this.end.getTime() - this.start.getTime());
  }

  public intersect(range: DateRange): Date {
    const start = Math.max(
      this.start.getTime(),
      range.getStart().getTime()
    );
    const end = Math.min(
      this.end.getTime(),
      range.getEnd().getTime()
    );

    return start < end ? new Date(end - start) : new Date(0);
  }
}
