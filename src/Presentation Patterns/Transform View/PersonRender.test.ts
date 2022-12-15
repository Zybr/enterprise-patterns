import PersonRender from "./PersonRender";
import { fillPerson } from "../../Data Patterns/Data Source/Data Mapper/utils/utils";
import Person from "../../Data Patterns/Data Source/Data Mapper/Domain/Models/Person";

describe('PersonRender', () => {
  // TODO: The test is skipped since XSLT library doesn't work ask expected
  test.skip('toHtml()', () => {
    const person = fillPerson(new Person());
    const render = new PersonRender();
    const expectedXml = `
      <?xml version="1.0" encoding="UTF-8"?>
        <record>
        <fullname>${person.getFirstName()}, ${person.getLastName()}</fullname>
      </record>
    `
    const xml = render.transform(person);

    expect(xml).toEqual(expectedXml);
  });
});
