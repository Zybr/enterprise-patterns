interface HandleTimeOut {
  (): void
}

export default class Timer {
  private timer: number | null = null;
  private readonly handler: HandleTimeOut

  public constructor(handler: HandleTimeOut) {
    this.handler = handler;
  }

  public stop(): this {
    if (!this.timer) {
      return;
    }

    clearTimeout(this.timer);
    this.timer = null;

    return this;
  }

  public reset(time: number): this {
    this.stop();
    this.timer = setInterval(this.handler, time) as unknown as number;

    return this;
  }
}
