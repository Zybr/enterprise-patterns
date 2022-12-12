import IdentityMap from "./IdentityMap";
import Person from "../../Data Patterns/Data Source/Data Mapper/Domain/Models/Person";
import { fillPerson } from "../../Data Patterns/Data Source/Data Mapper/utils/utils";

describe('IdentityMap', () => {
  test('find() & add()', () => {
    const identityMap = new IdentityMap();
    const model = fillPerson(new Person());
    model.id = 1;

    expect(identityMap.find(model.constructor.name, model.id)).toBeNull();

    identityMap.add(model);

    expect(identityMap.find(model.constructor.name, model.id)).toBe(model);
  });
});
