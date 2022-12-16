import { DbManager, personDbm } from "../../../../../database/databases";
import { IEntity } from "../../../../Data Patterns/Data Source/Data Mapper/Dao/Entities/IEntity";
import Person from "../../../../Data Patterns/Data Source/Data Mapper/Domain/Models/Person";
import PersonRepository from "./Repositories/PersonRepository";
import PersonMapper from "../../../../Data Patterns/Data Source/Data Mapper/Dao/Mappers/PersonMapper";
import EmailRepository from "./Repositories/EmailRepository";
import EmailMapper from "../../../../Data Patterns/Data Source/Data Mapper/Dao/Mappers/EmailMapper";
import ARepository from "./Repositories/ARepository";

export default class RepositoryFactory {
  private readonly dbMng: DbManager;

  public constructor() {
    this.dbMng = personDbm;
  }

  public makeRepository(type: string): ARepository<IEntity> {
    switch (type) {
      case Person.name:
        return new PersonRepository(this.dbMng, new PersonMapper(), this.makeEmailRepository());
      default:
        throw new Error(`EntityManager is not defined for "${type}"`);
    }
  }

  public makeEmailRepository(): EmailRepository {
    return new EmailRepository(this.dbMng, new EmailMapper());
  }
}
