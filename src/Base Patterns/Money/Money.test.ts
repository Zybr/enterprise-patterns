import Money from "./Money";
import Currency from "./Currency";

const createUsd = (amount: number): Money => new Money(amount, Currency.USD);
const createEur = (amount: number): Money => new Money(amount, Currency.EUR);

describe('Money', () => {
  test('getAmount()', () => {
    expect(createUsd(2).getAmount()).toEqual(2);
  });

  test('getCurrency()', () => {
    expect(createUsd(2).getCurrency()).toEqual(Currency.USD);
  });

  test('isEqual() - TRUE', () => {
    expect(createUsd(2).isEqual(createUsd(2))).toBeTruthy(); // 2 = 2 ?
  });

  test('isEqual() - FALSE', () => {
    expect(createUsd(1).isEqual(createUsd(2))).toBeFalsy(); // 1 = 2 ?
  });

  test('isLess() - TRUE', () => {
    expect(createUsd(1).isLess(createUsd(2))).toBeTruthy(); // 1 < 2 ?
  });

  test('isLess() - FALSE', () => {
    expect(createUsd(2).isLess(createUsd(1))).toBeFalsy(); // 2 < 1 ?
  });

  test('isGreater() - TRUE', () => {
    expect(createUsd(2).isGreater(createUsd(1))).toBeTruthy(); // 2 > 1 ?
  });

  test('isGreater() - FALSE', () => {
    expect(createUsd(1).isGreater(createUsd(2))).toBeFalsy(); // 1 > 2 ?
  });

  test('add()', () => {
    expect(createUsd(1).add(createUsd(2)).getAmount()).toEqual(3); // 1 + 2 = 3 ?
  });

  test('subtract()', () => {
    expect(createUsd(3).subtract(createUsd(2)).getAmount()).toEqual(1); // 3 - 2 = 1 ?
  });

  test('multiply()', () => {
    expect(createUsd(2).multiply(createUsd(3)).getAmount()).toEqual(6); // 2 * 3 = 6 ?
  });

  test('divide()', () => {
    expect(createUsd(6).divide(createUsd(3)).getAmount()).toEqual(2); // 6 / 3 = 2 ?
  });

  test('divide() - round ceil', () => {
    expect(createUsd(7).divide(createUsd(3)).getAmount()).toEqual(2); // 7 / 3 = 2 ?
  });

  test('divide() - round flor', () => {
    expect(createUsd(8).divide(createUsd(3)).getAmount()).toEqual(3); // 8 / 3 = 3 ?
  });

  test('Comparing different currencies', () => {
    const usd = createUsd(1);
    const eur = createEur(1);
    const errorMessage = 'Processed money instances have different currencies.';

    expect(() => usd.isEqual(eur)).toThrow(errorMessage);
    expect(() => usd.isLess(eur)).toThrow(errorMessage);
    expect(() => usd.isGreater(eur)).toThrow(errorMessage);
    expect(() => usd.add(eur)).toThrow(errorMessage);
    expect(() => usd.subtract(eur)).toThrow(errorMessage);
    expect(() => usd.divide(eur)).toThrow(errorMessage);
  })
});
