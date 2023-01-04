import DateRange from "./DateRange";
import { getHours, makeDate } from "./utils/time";

describe('DateRange', () => {
  test('duration()', () => {
    const range = new DateRange(
      makeDate(-4),
      makeDate(6)
    );

    expect(getHours(range.duration())).toEqual(10);
  });

  test('intersect()', () => {
    const rangeA = new DateRange(
      makeDate(-4),
      makeDate(2)
    );
    const rangeB = new DateRange(
      makeDate(-2),
      makeDate(6)
    );

    expect(getHours(rangeA.intersect(rangeB))).toEqual(4);
  });
});
