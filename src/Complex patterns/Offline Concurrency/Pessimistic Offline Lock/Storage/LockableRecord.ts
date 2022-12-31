import Record from "../../generic/Storage/Record";

export default class LockableRecord extends Record {
  private _isLocked: boolean = false;

  public isLocked(): boolean {
    return this._isLocked;
  }

  public setLocked(isLocked: boolean): this {
    this._isLocked = isLocked;
    return this;
  }

  public lock(): this {
    this._isLocked = true;
    return this;
  }

  public unlock(): this {
    this._isLocked = false;
    return this;
  }
}
