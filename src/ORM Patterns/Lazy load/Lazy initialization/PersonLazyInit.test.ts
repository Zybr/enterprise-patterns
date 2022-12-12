import ManagerFactory from "../../../Data Patterns/Data Source/Data Mapper/Dao/ManagerFactory";
import { personEmailDbm } from "../../../../database/databases";
import Person from "../../../Data Patterns/Data Source/Data Mapper/Domain/Models/Person";
import { fillPerson } from "../../../Data Patterns/Data Source/Data Mapper/utils/utils";
import PersonManager from "../../../Data Patterns/Data Source/Data Mapper/Dao/Managers/PersonManager";
import PersonLazyInit from "./PersonLazyInit";
import FieldFetcher from "../FieldFetcher";

describe('PersonLazyInit', () => {
  const modelManager = (new ManagerFactory(personEmailDbm.getDb())).makeManager(Person.name) as PersonManager;

  beforeEach(async () => await personEmailDbm.init());

  test('Getters', async () => {
    const model = await modelManager.save(fillPerson(new Person()));
    const modelProxy = new PersonLazyInit(new FieldFetcher(personEmailDbm.getDb()), model);
    const srcFirst = model.getFirstName();
    const srcLast = model.getLastName();
    const srcEmail = model.getEmail();

    model.setFirstName(null);
    model.setLastName(null);
    model.setLastName(null);

    expect(await modelProxy.getFirstName()).toEqual(srcFirst);
    expect(await modelProxy.getLastName()).toEqual(srcLast);
    expect(await modelProxy.getEmail()).toEqual(srcEmail);
  });
});
