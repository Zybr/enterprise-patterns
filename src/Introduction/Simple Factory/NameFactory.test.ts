import NameFactory from "./NameFactory";
import FirstFirst from "./FirstFirst";

describe('NameFactory', () => {
  const factory = new NameFactory();

  test('.getName()', () => {
    const nameStr = 'name';
    const name = factory.getName(nameStr);

    expect(name).toBeInstanceOf(FirstFirst);
    expect(name.getFrname()).toEqual(nameStr);
    expect(name.getLname()).toEqual('');
  });
});
