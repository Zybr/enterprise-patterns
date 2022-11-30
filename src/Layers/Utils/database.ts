import { insert } from "../../Utils/database";
import { faker } from '@faker-js/faker';
import PersonData from "../Types/PersonData";

export const makePersonData = (): PersonData => {
  return {
    id: null,
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
  };
}
export const createPersonData = (): Promise<PersonData> => {
  const person = makePersonData();

  return new Promise<PersonData>((resolve) =>
    insert('persons', person)
      .then((id) => resolve(Object.assign(person, {id})))
  );
}
