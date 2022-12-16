import { fillPerson } from "../../../Data Patterns/Data Source/Data Mapper/utils/utils";
import Person from "../../../Data Patterns/Data Source/Data Mapper/Domain/Models/Person";
import PersonTemplateView from "./PersonTemplateView";

describe('PersonTemplateView', () => {
  const template = new PersonTemplateView();

  test('render()', () => {
    const person = fillPerson(new Person);
    person.id = 1;

    const html = template.render(person);

    expect(html.trim()).toEqual(`
<table>
  <tr>
    <th>ID</th>
    <td>${person.id}</td>
  </tr>
  <tr>
    <th>Full name</th>
    <td>${person.getFirstName()} ${person.getLastName()}</td>
  </tr>
  <tr>
    <th>Email</th>
    <td>${person.getEmail()}</td>
  </tr>
</table>
`.trim()
    )
  });
});
