import EntityManager from "./EntityManager";
import Person from "../../Domain/Models/Person";
import { Database } from "sqlite3"
import EmailManager from "./EmailManager";
import PersonPropsSet from "../Entities/PersonPropsSet";
import EmailPropsSet from "../Entities/EmailPropsSet";
import PersonMapper from "../Mappers/PersonMapper";

export default class PersonManager extends EntityManager<Person, PersonPropsSet> {
  private readonly emailManager: EmailManager;

  public constructor(db: Database, mapper: PersonMapper, emailMng: EmailManager) {
    super(db, mapper);
    this.emailManager = emailMng;
  }

  protected makeEntity(): Person {
    return new Person();
  }

  protected mapEntity(person: Person, propsSet: PersonPropsSet): Promise<Person> {
    return super
      .mapEntity(person, propsSet)
      .then(person => this.selectEmail(person))
      .then(email => {
        return person.setEmail(email ? email.mail : null);
      })
  }

  public save(person: Person): Promise<Person> {
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
      .then(email => this.create(
          Object.assign(
            this.mapper.makePropsSet(person),
            {
              email_id: email.id,
            },
          )
        )
      )
      .then(propsSet => this.mapper.mapEntity(person, propsSet))
  }

  public delete(person: Person): Promise<boolean> {
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

  private saveEmail(person: Person): Promise<EmailPropsSet> {
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

  private selectEmail(person: Person): Promise<EmailPropsSet | null> {
    if (person.id === null) {
      return Promise.resolve(null);
    }

    return this
      .selectBy({id: person.id})
      .then((personSet) => this.emailManager.find(personSet[0].email_id))
  }
}
