import Department from "../Serialized LOB/Models/Department";
import DepartmentEntity from "../Serialized LOB/Entities/DepartmentEntity";

export const assertDepartmentContent = (department: Department, props: DepartmentEntity): void => {
  expect(department.getName()).toEqual(props.name);
  expect(department.getParent()?.getName()).toEqual(props.parent?.name);
  expect(department.getParent()?.getParent()?.getName()).toEqual(props.parent?.parent?.name);
  expect(department.getParent()?.getParent()?.getParent()?.getName()).toEqual(props.parent?.parent?.parent?.name);
}
