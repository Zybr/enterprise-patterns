import EntityManager from "./Managers/EntityManager";
import Person from "../Domain/Models/Person";
import PersonManager from "./Managers/PersonManager";
import { personEmailDbm } from "../../../../database/databases";
import Entity from "./Entities/Entity";
import EmailManager from "./Managers/EmailManager";
import { Database } from "sqlite3"
import PropsSet from "./Entities/PropsSet";
import PersonMapper from "./Mappers/PersonMapper";
import EmailMapper from "./Mappers/EmailMapper";

export default class ManagerFactory {
  private readonly db: Database;

  public constructor(db: Database) {
    this.db = db;
  }

  public makeManager(type: string): EntityManager<Entity, PropsSet> {
    switch (type) {
      case Person.name:
        return new PersonManager(this.db, new PersonMapper(), this.makeEmailManager());
      /**
       * Can be extended here for new entities
       */
      default:
        throw new Error(`EntityManager is not defined for "${type}"`);
    }
  }

  public makeEmailManager(): EmailManager {
    return new EmailManager(personEmailDbm.getDb(), new EmailMapper());
  }
}
