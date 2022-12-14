import EntityManager from "../../../Data Patterns/Data Source/Data Mapper/Dao/Managers/EntityManager";
import EmploymentModel from "../Models/EmploymentModel";
import EmploymentEntity from "../Entities/EmploymentEntity";

export default class EmploymentManager extends EntityManager<EmploymentModel, EmploymentEntity> {
  protected makeEntity(): EmploymentModel {
    return new EmploymentModel();
  }
}
