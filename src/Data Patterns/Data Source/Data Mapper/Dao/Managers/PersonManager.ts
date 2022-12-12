import EntityManager from "./EntityManager";
import { Database } from "sqlite3";
import EmailManager from "./EmailManager";
import PersonPropsSet from "../Entities/PersonPropsSet";
import EmailPropsSet from "../Entities/EmailPropsSet";
import PersonMapper from "../Mappers/PersonMapper";
import IPerson from "../../Domain/Models/IPerson";
import Person from "../../Domain/Models/Person";

export default class PersonManager extends EntityManager<IPerson, PersonPropsSet> {
  private readonly emailManager: EmailManager;

  public constructor(db: Database, mapper: PersonMapper, emailMng: EmailManager) {
    super(db, mapper);
    this.emailManager = emailMng;
  }

  protected makeEntity(): IPerson {
    return new Person();
  }

  protected mapEntity(person: IPerson, propsSet: PersonPropsSet): Promise<IPerson> {
    return super
      .mapEntity(person, propsSet)
      .then(person => this.selectEmail(person))
      .then(email => {
        return person.setEmail(email ? email.mail : null);
      })
  }

  public save(person: IPerson): Promise<IPerson> {
    return this
      .saveEmail(person)
      .then(email => this.emailManager
        .save(
          {
            id: email ? email.id : null,
            mail: person.getEmail(),
          }
        )
      )
      .then(email => {
          const propsSet = Object.assign(
            this.mapper.makePropsSet(person),
            {
              email_id: email.id,
            },
          );
          return (person.id === null)
            ? this.create(propsSet)
            : this.update(propsSet)
        }
      )
      .then(propsSet => this.mapper.mapEntity(person, propsSet))
  }

  public delete(person: IPerson): Promise<boolean> {
    if (person.id === null) {
      return Promise.resolve(false);
    }

    return this
      // Delete email
      .selectEmail(person)
      .then((email) => {
        if (email !== null) {
          this.emailManager.delete(email)
        }
      })
      // Delete person
      .then(() => super.delete(person))
  }

  private saveEmail(person: IPerson): Promise<EmailPropsSet> {
    if (person.id === null) { // Create new email
      return this.emailManager.save({
        id: null,
        mail: person.getEmail()
      })
    } else { // Update existed email
      return this.selectEmail(person)
        .then(email => {
          email.mail = person.getEmail();
          return this.emailManager.save(email);
        });
    }
  }

  private selectEmail(person: IPerson): Promise<EmailPropsSet | null> {
    if (person.id === null) {
      return Promise.resolve(null);
    }

    return this
      .selectBy({id: person.id})
      .then((personSet) => this.emailManager.find(personSet[0].email_id))
  }
}
