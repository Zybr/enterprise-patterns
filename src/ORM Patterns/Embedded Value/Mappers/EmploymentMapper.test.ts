import EmploymentMapper from "./EmploymentMapper";
import Person from "../../../Data Patterns/Data Source/Data Mapper/Domain/Models/Person";
import EmploymentModel from "../Models/EmploymentModel";
import TimeInterval from "../../../Introduction/Decomposition/TimeInterval";
import Money from "../Models/Money";
import Currency from "../Enums/Currency";

describe('EmploymentMapper', () => {
  const mapper = new EmploymentMapper();

  test('makeProps()', () => {
    const person = new Person();
    const employment = new EmploymentModel()
    person.id = 1;
    employment.id = 2;
    employment.setPerson(person);
    employment.setPeriod(
      new TimeInterval(
        new Date(2010, 0, 1),
        new Date(2020, 0, 1)
      ),
    )
    employment.setSalary(new Money(5000, Currency.USD))

    const props = mapper.makePropsSet(employment);

    expect(props.id).toEqual(2);
    expect(props.person_id).toEqual(1);
    expect(props.start).toEqual('2010-1-1');
    expect(props.end).toEqual('2020-1-1');
    expect(props.salary_amount).toEqual(5000);
    expect(props.salary_currency).toEqual('USD');
  });
});
