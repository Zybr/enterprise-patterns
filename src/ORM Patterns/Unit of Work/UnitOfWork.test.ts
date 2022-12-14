import Person from "../../Data Patterns/Data Source/Data Mapper/Domain/Models/Person";
import UnitOfWork from "./UnitOfWork";
import { personDbm } from "../../../database/databases";
import ManagerFactory from "../../Data Patterns/Data Source/Data Mapper/Dao/ManagerFactory";
import { faker } from '@faker-js/faker';
import PersonManager from "../../Data Patterns/Data Source/Data Mapper/Dao/Managers/PersonManager";
import { fillPerson } from "../../Data Patterns/Data Source/Data Mapper/utils/utils";

describe('UnitOfWork', () => {
  const personManager = (new ManagerFactory())
    .makeManager(Person.name) as PersonManager;
  const uow = new UnitOfWork({
    [Person.name]: personManager
  });

  beforeEach(async () => await personDbm.init());

  test('registerCreated()', async () => {
    const model = fillPerson(new Person());

    expect(model.id).toBeNull();
    await uow.registerCreated(model).commit()

    expect(model.id).not.toBeNull();
    const createdRow = await personDbm.selectById('persons', model.id);
    expect(createdRow).not.toBeNull();
  });

  test('registerUpdated()', async () => {
    const model = await personManager.save(fillPerson(new Person()))
    const newFirstName = faker.name.firstName();
    const newEmail = faker.internet.email();

    model.setFirstName(newFirstName);
    model.setEmail(newEmail);
    await uow.registerUpdated(model).commit()

    const updatedRow = await personDbm.selectById('persons', model.id);
    expect(newFirstName).toEqual(updatedRow['first_name']);
    const updatedEmailRow = await personDbm.selectById('emails', updatedRow['email_id'])
    expect(newEmail).toEqual(updatedEmailRow['mail']);
  });

  test('registerDeleted()', async () => {
    const model = await personManager.save(fillPerson(new Person()))

    await uow.registerRemoved(model).commit()

    const removedRow = await personDbm.selectById('persons', model.id);
    expect(removedRow).toBeNull();
  });

  test('registerCreated() & registerDeleted()', async () => {
    const model = fillPerson(new Person());

    await uow.registerCreated(model)
      .registerRemoved(model)
      .commit()

    const removedRow = await personDbm.selectById('persons', model.id);
    expect(removedRow).toBeNull();
  });

  test('registerUpdated() & registerDeleted()', async () => {
    const model = await personManager.save(fillPerson(new Person()))

    await uow.registerUpdated(model)
      .registerRemoved(model)
      .commit()

    const removedRow = await personDbm.selectById('persons', model.id);
    expect(removedRow).toBeNull();
  });
});
