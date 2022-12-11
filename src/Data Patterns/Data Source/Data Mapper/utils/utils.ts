import PropsSet from "../Dao/Entities/PropsSet";
import { faker } from '@faker-js/faker';
import IPerson from "../Domain/Models/IPerson";

const makePersonFields = (): PropsSet => {
  return {
    id: null,
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
  }
};

const fillPerson = (person: IPerson): IPerson => {
  return person.setFirstName(faker.name.firstName())
    .setLastName(faker.name.lastName())
    .setEmail(faker.internet.email());
}

export {
  makePersonFields,
  fillPerson,
}
