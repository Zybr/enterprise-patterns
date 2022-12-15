import ManagerFactory from "../../../../Data Patterns/Data Source/Data Mapper/Dao/ManagerFactory";
import { personDbm } from "../../../../../database/databases";
import Person from "../../../../Data Patterns/Data Source/Data Mapper/Domain/Models/Person";
import PersonManager from "../../../../Data Patterns/Data Source/Data Mapper/Dao/Managers/PersonManager";
import UnitOfWork from "../UnitOfWork";
import { fillPerson } from "../../../../Data Patterns/Data Source/Data Mapper/utils/utils";
import PersonUow from "./PersonUow";

describe('PersonUow', () => {
  const personManager = (new ManagerFactory())
    .makeManager(Person.name) as PersonManager;
  const uow = new UnitOfWork({
    [Person.name]: personManager
  });

  beforeEach(async () => await personDbm.init());

  test('create', async () => {
    const model = fillPerson(new PersonUow(uow, new Person()));

    await uow.commit();

    const createdRow = await personDbm.selectById('persons', model.id);
    expect(createdRow).not.toBeNull();
  });

  test('update', async () => {
    let model = await personManager.save(fillPerson(new PersonUow(uow, new Person())));
    model = fillPerson(model)

    await uow.commit();

    const createdRow = await personDbm.selectById('persons', model.id);
    expect(createdRow).not.toBeNull();
  });

  test('delete', async () => {
    let model = await personManager.save(fillPerson(new PersonUow(uow, new Person()))) as PersonUow;

    model.delete();
    await uow.commit();

    const createdRow = await personDbm.selectById('persons', model.id);
    expect(createdRow).toBeNull();
  });
});
