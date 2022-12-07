import PersonUpdateFactory from "./PersonUpdateFactory";
import { faker } from '@faker-js/faker';
import PersonPropsSet from "./properties/PersonPropSet";

const makePersonProps = (): PersonPropsSet => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  year: parseInt(faker.random.numeric()),
});

describe('PersonUpdateFactory', () => {
  const factory = new PersonUpdateFactory();

  test('createInsert()', () => {
    const props = makePersonProps();
    const insertMap = factory.createInsert(props);

    expect(insertMap.fields).toEqual('first_name, last_name, year');
    expect(insertMap.values).toEqual(`${props.firstName}, ${props.lastName}, ${props.year}`);
  });

  test('createUpdate()', () => {
    const props = makePersonProps();
    props.id = parseInt(faker.random.numeric());

    const updateMap = factory.createUpdate(props);

    expect(updateMap.where).toEqual(`id = ${props.id}`);
    expect(updateMap.values).toEqual(`first_name = "${props.firstName}" last_name = "${props.lastName}" year = ${props.year}`);
  });
});
