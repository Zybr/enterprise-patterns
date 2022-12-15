import IPerson from "../../Data Patterns/Data Source/Data Mapper/Domain/Models/IPerson";

export default class PersonTransformView {
  public toXml(person: IPerson): string {
    return `
      <?xml version="1.0"?>
      <person>
        <firstName>${person.getFirstName()}</firstName>
        <lastName>${person.getLastName()}</lastName>
      </person>
    `;
  }
}
