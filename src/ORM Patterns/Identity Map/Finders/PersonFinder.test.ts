import { fillPerson } from "../../../Data Patterns/Data Source/Data Mapper/utils/utils";
import Person from "../../../Data Patterns/Data Source/Data Mapper/Domain/Models/Person";
import PersonFinder from "./PersonFinder";
import IdentityMap from "../IdentityMap";
import PersonMapper from "../../../Data Patterns/Data Source/Data Mapper/Dao/Mappers/PersonMapper";
import { personDbm } from "../../../../database/databases";
import ManagerFactory from "../../../Data Patterns/Data Source/Data Mapper/Dao/ManagerFactory";

describe('PersonFinder', () => {

  beforeAll(async () => await personDbm.init());

  test('find', async () => {
    const db = personDbm.getDb();
    const personManager = (new ManagerFactory()).makeManager(Person.name)
    const model = await personManager.save(fillPerson(new Person()))
    const dbSpy = jest.spyOn(db, 'get')
    const finder = new PersonFinder(db, new IdentityMap(), new PersonMapper())

    await finder.find(model.id);
    await finder.find(model.id);
    await finder.find(model.id);

    expect(dbSpy).toHaveBeenCalledTimes(1);
  });
});
