import ApplicationController from "./ApplicationController";
import ManagerFactory from "../../../Data Patterns/Data Source/Data Mapper/Dao/ManagerFactory";
import Person from "../../../Data Patterns/Data Source/Data Mapper/Domain/Models/Person";
import PersonManager from "../../../Data Patterns/Data Source/Data Mapper/Dao/Managers/PersonManager";
import { fillPerson } from "../../../Data Patterns/Data Source/Data Mapper/utils/utils";
import PersonTemplateView from "../../View Patterns/Two Step View/PersonTemplateView";

describe('ApplicationController', () => {
  const manager = new ManagerFactory().makeManager(Person.name) as PersonManager;
  const appController = new ApplicationController();

  test('getPerson()', async () => {
    const person = await manager.save(fillPerson(new Person()));

    // @ts-ignore
    const html = await appController.getPerson(person.id);
    const expectedHtml = new PersonTemplateView().render(person);

    expect(html).toContain('<table>');
    expect(html).toEqual(expectedHtml);
  });
});
