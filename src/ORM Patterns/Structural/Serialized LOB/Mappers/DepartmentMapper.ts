import Department from "../Models/Department";

/**
 * It doesn't extend EntityManger since it's not typical mapper between model and table
 *
 * Rest implementation:
 * @see EmploymentMapper
 * @see EmploymentManager
 */
export default class DepartmentMapper {
  public mapEntity(department: Department, json: string | object): Department {
    const data = typeof json === 'string' ? JSON.parse(json) : json;
    department.setName(data['name'] ?? null);
    department.setParent(data['parent'] ? this.mapEntity(new Department(), data['parent']) : null);

    return department;
  }

  public makeProp(department: Department | null): string | null {
    return department
      ? JSON.stringify({
        parent: this.makeProp(department.getParent()),
        name: department.getName(),
      })
      : null;
  }
}
