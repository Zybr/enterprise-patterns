import { insert } from "../../Utils/database";
import { faker } from '@faker-js/faker';
import Person from "../Table Data Gateway/Person";

export const makePerson = (): Person => {
  return {
    id: null,
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
  };
}
export const createPerson = (): Promise<Person> => {
  const person = makePerson();

  return new Promise<Person>((resolve) =>
    insert('persons', person)
      .then((id) => resolve(Object.assign(person, {id})))
  );
}
