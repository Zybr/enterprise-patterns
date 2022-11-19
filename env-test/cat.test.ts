import Cat from "./cat";

describe('Cat', () => {
  const cat = new Cat();

  test('.setWeight() & .getWeight()', () => {
    cat.setWeight(3);
    expect(cat.getWeight()).toEqual(3);
  });
});
