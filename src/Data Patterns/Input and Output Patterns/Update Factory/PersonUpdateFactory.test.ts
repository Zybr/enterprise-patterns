import PersonUpdateFactory from "./PersonUpdateFactory";
import { makePersonProps } from "../../utils/utils";
import { faker } from '@faker-js/faker';

describe('PersonUpdateFactory', () => {
  const factory = new PersonUpdateFactory();

  test('createInsert()', () => {
    const props = makePersonProps();
    const insertMap = factory.createInsert(props);

    expect(insertMap.fields).toEqual('first_name, last_name, year, email');
    expect(insertMap.values).toEqual(`${props.firstName}, ${props.lastName}, ${props.year}, ${props.email}`);
  });

  test('createUpdate()', () => {
    const props = makePersonProps();
    props.id = parseInt(faker.random.numeric());

    const updateMap = factory.createUpdate(props);

    expect(updateMap.where).toEqual(`id = ${props.id}`);
    expect(updateMap.values).toEqual(
      `first_name = "${props.firstName}"`
      + ` last_name = "${props.lastName}"`
      + ` year = ${props.year}`
      + ` email = "${props.email}"`
    );
  });
});
