import Currency from "../Enums/Currency";

export default class Money {
  public constructor(
    private amount: number,
    private currency: Currency,
  ) {
  }

  getAmount(): number {
    return this.amount;
  }

  setAmount(value: number) {
    this.amount = value;

    return this;
  }

  getCurrency(): Currency {
    return this.currency;
  }

  setCurrency(value: Currency) {
    this.currency = value;

    return this;
  }
}
