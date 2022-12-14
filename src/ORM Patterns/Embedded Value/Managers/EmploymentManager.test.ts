import Person from "../../../Data Patterns/Data Source/Data Mapper/Domain/Models/Person";
import EmploymentModel from "../Models/EmploymentModel";
import TimeInterval from "../../../Introduction/Decomposition/TimeInterval";
import Money from "../Models/Money";
import Currency from "../Enums/Currency";
import PersonManager from "../../../Data Patterns/Data Source/Data Mapper/Dao/Managers/PersonManager";
import ManagerFactory from "../../../Data Patterns/Data Source/Data Mapper/Dao/ManagerFactory";
import { fillPerson } from "../../../Data Patterns/Data Source/Data Mapper/utils/utils";
import { personDbm } from "../../../../database/databases";
import DepartmentEntity from "../../Serialized LOB/Entities/DepartmentEntity";
import Department from "../../Serialized LOB/Models/Department";
import { faker } from '@faker-js/faker';
import { assertDepartmentContent } from "../../utils/utils";

describe('EmploymentManager', () => {
  test('save()', async () => {
    const factory = new ManagerFactory();
    const personMng = factory.makeManager(Person.name) as PersonManager;
    const employmentMng = factory.makeManager(EmploymentModel.name);
    const person = await personMng.save(fillPerson(new Person()))
    const employment = new EmploymentModel()
    employment.setPerson(person);
    employment.setPeriod(
      new TimeInterval(
        new Date(2010, 0, 1),
        new Date(2020, 0, 1)
      ),
    )
    employment.setSalary(new Money(5000, Currency.USD))
    const departmentProps: DepartmentEntity = {
      name: faker.word.noun(),
      parent: {
        name: faker.word.noun(),
        parent: {
          name: faker.word.noun(),
          parent: null
        }
      }
    };
    const department = new Department()
      .setName(departmentProps.name)
      .setParent(
        new Department()
          .setName(departmentProps.parent.name)
          .setParent(
            new Department()
              .setName(departmentProps.parent.parent.name)
          )
      );
    employment.setDepartment(department);

    await employmentMng.save(employment);

    expect(employment.id).not.toBeNull();
    const props = await personDbm.selectById('employments', employment.id);
    expect(props['person_id']).toEqual(person.id);
    expect(props['start']).toEqual('2010-1-1');
    expect(props['end']).toEqual('2020-1-1');
    expect(props['salary_amount']).toEqual(5000);
    expect(props['salary_currency']).toEqual('USD');
    assertDepartmentContent(department, departmentProps)
  });
});
