import IPerson from "../../../Data Patterns/Data Source/Data Mapper/Domain/Models/IPerson";
import * as fs from 'fs';
import ATemplateView from "./ATemplateView";

export default class PersonTemplateView extends ATemplateView {
  public render(person: IPerson): string {
    return this.fillTemplate(
      fs.readFileSync(__dirname + '/templates/person.tpl').toString(),
      {
        id: person.id,
        fullName: `${person.getFirstName()} ${person.getLastName()}`,
        email: person.getEmail()
      });
  }
}
