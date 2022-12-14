import DepartmentMapper from "./DepartmentMapper";
import DepartmentEntity from "../Entities/DepartmentEntity";
import { faker } from '@faker-js/faker';
import Department from "../Models/Department";
import { assertDepartmentContent } from "../../utils/utils";

describe('DepartmentMapper', () => {
  const mapper = new DepartmentMapper();

  test('mapEntity()', () => {
    const props: DepartmentEntity = {
      name: faker.word.noun(),
      parent: {
        name: faker.word.noun(),
        parent: {
          name: faker.word.noun(),
          parent: null
        }
      }
    };

    const department = mapper.mapEntity(new Department(), JSON.stringify(props));

    assertDepartmentContent(department, props);
  });
});
