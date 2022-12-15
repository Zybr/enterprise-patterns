import ManagerFactory from "../../../../Data Patterns/Data Source/Data Mapper/Dao/ManagerFactory";
import { personDbm } from "../../../../../database/databases";
import Person from "../../../../Data Patterns/Data Source/Data Mapper/Domain/Models/Person";
import PersonManager from "../../../../Data Patterns/Data Source/Data Mapper/Dao/Managers/PersonManager";
import { fillPerson } from "../../../../Data Patterns/Data Source/Data Mapper/utils/utils";
import PersonFirstNameValueHolder from "./PersonFirstNameValueHolder";
import FieldFetcher from "../FieldFetcher";

describe('PersonFirstNameValueHolder', () => {
  const modelManager = (new ManagerFactory()).makeManager(Person.name) as PersonManager;

  beforeEach(async () => await personDbm.init());

  test('getValue()', async () => {
    const model = await modelManager.save(fillPerson(new Person()));
    const firstNameHolder = new PersonFirstNameValueHolder(new FieldFetcher(personDbm.getDb()), model.id);
    const srcFirstName = model.getFirstName();

    expect(await firstNameHolder.getValue()).toEqual(srcFirstName);
  });
});
