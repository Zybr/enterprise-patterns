import ManagerFactory from "../../../Data Patterns/Data Source/Data Mapper/Dao/ManagerFactory";
import { personEmailDbm } from "../../../../database/databases";
import Person from "../../../Data Patterns/Data Source/Data Mapper/Domain/Models/Person";
import PersonManager from "../../../Data Patterns/Data Source/Data Mapper/Dao/Managers/PersonManager";
import { fillPerson } from "../../../Data Patterns/Data Source/Data Mapper/utils/utils";
import PersonFirstNameValueHolder from "./PersonFirstNameValueHolder";
import FieldFetcher from "../FieldFetcher";

describe('PersonFirstNameValueHolder', () => {
  const modelManager = (new ManagerFactory(personEmailDbm.getDb())).makeManager(Person.name) as PersonManager;

  beforeEach(async () => await personEmailDbm.init());

  test('getValue()', async () => {
    const model = await modelManager.save(fillPerson(new Person()));
    const firstNameHolder = new PersonFirstNameValueHolder(new FieldFetcher(personEmailDbm.getDb()), model.id);
    const srcFirstName = model.getFirstName();

    expect(await firstNameHolder.getValue()).toEqual(srcFirstName);
  });
});
