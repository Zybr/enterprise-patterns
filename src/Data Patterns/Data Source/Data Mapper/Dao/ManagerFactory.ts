import EntityManager from "./Managers/EntityManager";
import Person from "../Domain/Models/Person";
import PersonManager from "./Managers/PersonManager";
import { personDbm } from "../../../../../database/databases";
import EmailManager from "./Managers/EmailManager";
import { Database } from "sqlite3";
import PropsSet from "./Entities/PropsSet";
import PersonMapper from "./Mappers/PersonMapper";
import EmailMapper from "./Mappers/EmailMapper";
import { IEntity } from "./Entities/IEntity";
import EmploymentModel from "../../../../ORM Patterns/Structural/Embedded Value/Models/EmploymentModel";
import EmploymentManager from "../../../../ORM Patterns/Structural/Embedded Value/Managers/EmploymentManager";
import EmploymentMapper from "../../../../ORM Patterns/Structural/Embedded Value/Mappers/EmploymentMapper";

export default class ManagerFactory {
  private readonly db: Database;

  public constructor() {
    this.db = personDbm.getDb();
  }

  public makeManager(type: string): EntityManager<IEntity, PropsSet> {
    switch (type) {
      case Person.name:
        return new PersonManager(this.db, new PersonMapper(), this.makeEmailManager());
      case EmploymentModel.name:
        return new EmploymentManager(this.db, new EmploymentMapper());
      default:
        throw new Error(`EntityManager is not defined for "${type}"`);
    }
  }

  public makeEmailManager(): EmailManager {
    return new EmailManager(personDbm.getDb(), new EmailMapper());
  }
}
