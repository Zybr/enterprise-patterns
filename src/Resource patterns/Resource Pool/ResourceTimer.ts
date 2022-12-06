interface HandleTimeOut {
  (): void
}

export default class ResourceTimer {
  private timer: number | null = null;
  private readonly handler: HandleTimeOut
  private readonly delay: number;

  public constructor(delay: number, handler: HandleTimeOut) {
    this.delay = delay;
    this.handler = handler;
  }

  public stop(): void {
    if (!this.timer) {
      return;
    }

    clearTimeout(this.timer);
    this.timer = null;
  }

  public reset(time: number): void {
    this.stop();
    this.timer = setTimeout(this.handler, time) as unknown as number;
  }
}
