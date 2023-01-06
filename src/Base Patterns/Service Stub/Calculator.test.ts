import "isomorphic-fetch";
import Calculator from "../../Complex patterns/Distribution Patterns/Remote Facade/Calculator/Calculator";
import StubClient from "./Clients/StubClient";

describe('Calculator', () => {
  const calculator = new Calculator(new StubClient());

  test('add()', async () => {
    expect(
      await calculator.add(10, 5)
    )
      .toEqual(15)
  });

  test('subtract()', async () => {
    expect(
      await calculator.subtract(10, 5)
    )
      .toEqual(5)
  });

  test('multiply()', async () => {
    expect(
      await calculator.multiply(10, 5)
    )
      .toEqual(50)
  });

  test('divide()', async () => {
    expect(
      await calculator.divide(10, 5)
    )
      .toEqual(2)
  });
});
