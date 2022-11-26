export default class Namer {
  protected frName: string = '';
  protected lName: string = '';

  public getFrname(): string {
    return this.frName;
  }

  public getLname(): string {
    return this.lName;
  }
}
