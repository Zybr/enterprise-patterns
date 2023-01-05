import Currency from "./Currency";

interface Operate {
  (a: number, b: number): number
}

export default class Money {
  public constructor(
    private readonly amount: number,
    private readonly currency: Currency
  ) {
  }

  public getAmount(): number {
    return this.amount;
  }

  public getCurrency(): Currency {
    return this.currency;
  }

  public isEqual(other: Money): boolean {
    return this.compare(other) === 0;
  }

  public isLess(other: Money): boolean {
    return this.compare(other) < 0;
  }

  public isGreater(other: Money): boolean {
    return this.compare(other) > 0;
  }

  public add(other: Money): Money {
    return this.operate(other, (a, b) => a + b);
  }

  public subtract(other: Money): Money {
    return this.operate(other, (a, b) => a - b);
  }

  public multiply(other: Money): Money {
    return this.operate(other, (a, b) => a * b);
  }

  public divide(other: Money): Money {
    return this.operate(other, (a, b) => Math.round(a / b));
  }

  private assertSameCurrency(money: Money): void {
    if (money.getCurrency() !== this.currency) {
      throw Error('Processed money instances have different currencies.');
    }
  }

  private compare(other: Money): number {
    this.assertSameCurrency(other);

    return this.getAmount() - other.getAmount();
  }

  private operate(other: Money, operate: Operate): Money {
    this.assertSameCurrency(other);

    return new Money(
      operate(this.getAmount(), other.getAmount()),
      this.getCurrency()
    )
  }
}
