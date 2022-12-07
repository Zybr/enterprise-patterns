import IResource from "../IResource";

export default class Retryer implements IResource {
  private readonly resource;
  private readonly maxAttempts: number

  public constructor(resource: IResource, attempts: number) {
    this.resource = resource;
    this.maxAttempts = attempts;
  }

  public async selectOne(sql: string, params: []): Promise<[] | null> {
    let attempts = this.maxAttempts;

    while (true) {
      try {
        return await this.resource.selectOne(sql, params);
      } catch (err) {
        if (--attempts === 0) {
          return Promise.reject(err);
        }
      }
    }
  }

  public close(): this {
    return this.resource.close();
  }
}
