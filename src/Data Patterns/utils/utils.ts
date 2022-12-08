import PersonPropsSet from "../Input and Output Patterns/Update Factory/properties/PersonPropSet";
import { faker } from '@faker-js/faker';

export const makePersonProps = (): PersonPropsSet => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  year: parseInt(faker.random.numeric()),
  email: faker.internet.email(),
});

