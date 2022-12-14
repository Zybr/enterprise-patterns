import EntityMapper from "../../../Data Patterns/Data Source/Data Mapper/Dao/Mappers/EntityMapper";
import EmploymentModel from "../Models/EmploymentModel";
import EmploymentEntity from "../Entities/EmploymentEntity";
import { dateToDbString, dbStringToDate } from "../../../utils/utils";
import TimeInterval from "../../../Introduction/Decomposition/TimeInterval";
import Money from "../Models/Money";
import Currency from "../Enums/Currency";

export default class EmploymentMapper extends EntityMapper<EmploymentModel, EmploymentEntity> {
  public getColumnsNames(): string[] {
    return [
      'id',
      'person_id',
      'start',
      'end',
      'salary_amount',
      'salary_currency',
    ]
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

    return model;
  }
}
