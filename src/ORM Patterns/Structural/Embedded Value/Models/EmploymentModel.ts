import Entity from "../../../../Data Patterns/Data Source/Data Mapper/Dao/Entities/Entity";
import TimeInterval from "../../../../Introduction/Decomposition/TimeInterval";
import Money from "./Money";
import IPerson from "../../../../Data Patterns/Data Source/Data Mapper/Domain/Models/IPerson";
import Department from "../../Serialized LOB/Models/Department";

export default class EmploymentModel extends Entity {
  private person: IPerson | null;
  private period: TimeInterval | null;
  private salary: Money | null;
  private department: Department | null;

  public getPerson(): IPerson | null {
    return this.person;
  }

  public setPerson(value: IPerson | null) {
    this.person = value;

    return this;
  }

  public getPeriod(): TimeInterval | null {
    return this.period;
  }

  public setPeriod(value: TimeInterval | null) {
    this.period = value;

    return this;
  }

  public getSalary(): Money | null {
    return this.salary;
  }

  public setSalary(value: Money | null) {
    this.salary = value;

    return this;
  }

  public getDepartment(): Department | null {
    return this.department;
  }

  public setDepartment(department: Department): this {
    this.department = department;

    return this;
  }
}
