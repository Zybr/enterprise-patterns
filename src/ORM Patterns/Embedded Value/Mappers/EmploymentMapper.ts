import EntityMapper from "../../../Data Patterns/Data Source/Data Mapper/Dao/Mappers/EntityMapper";
import EmploymentModel from "../Models/EmploymentModel";
import EmploymentEntity from "../Entities/EmploymentEntity";
import { dateToDbString, dbStringToDate } from "../../../utils/utils";
import TimeInterval from "../../../Introduction/Decomposition/TimeInterval";
import Money from "../Models/Money";
import Currency from "../Enums/Currency";
import DepartmentMapper from "../../Serialized LOB/Mappers/DepartmentMapper";
import Department from "../../Serialized LOB/Models/Department";

export default class EmploymentMapper extends EntityMapper<EmploymentModel, EmploymentEntity> {
  private readonly departmentMapper: DepartmentMapper;

  public constructor() {
    super();
    this.departmentMapper = new DepartmentMapper();
  }

  public getColumnsNames(): string[] {
    return Object.keys(this.makePropsSet(new EmploymentModel()));
  }

  public getTableName(): string {
    return "employments";
  }

  public makePropsSet(model: EmploymentModel): EmploymentEntity {
    return {
      id: model.id,
      person_id: model.getPerson()?.id,
      start: model.getPeriod()?.getStart() ? dateToDbString(model.getPeriod().getStart()) : null,
      end: model.getPeriod()?.getEnd() ? dateToDbString(model.getPeriod().getEnd()) : null,
      salary_amount: model.getSalary()?.getAmount(),
      salary_currency: model.getSalary()?.getCurrency(),
      department: this.departmentMapper.makeProp(model.getDepartment())
    }
  }

  public mapEntity(model: EmploymentModel, props: EmploymentEntity): EmploymentModel {
    if (this.isInt(props['id'])) {
      model.id = props.id;
    }

    if (this.isString(props.start) && this.isString(props.end)) {
      model.setPeriod(new TimeInterval(
        dbStringToDate(props.start),
        dbStringToDate(props.end),
      ));
    }

    if (this.isFloat(props.salary_amount) && this.isEnum(props.salary_currency, Currency)) {
      model.setSalary(new Money(
        props.salary_amount,
        props.salary_currency as Currency
      ));
    }

    if (this.isString(props.department)) {
      model.setDepartment(
        this.departmentMapper.mapEntity(
          new Department(),
          props.department
        )
      )
    }

    return model;
  }
}
