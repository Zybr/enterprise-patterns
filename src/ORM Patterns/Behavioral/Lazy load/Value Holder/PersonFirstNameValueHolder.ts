import FieldFetcher from "../FieldFetcher";

export default class PersonFirstNameValueHolder {
  public constructor(
    private readonly fetcher: FieldFetcher,
    private readonly id: number,
  ) {
  }

  public getValue(): Promise<string | null> {
    return this.fetcher.getField('persons', this.id, 'first_name');
  }
}
