import Person from "../../../../../Data Patterns/Data Source/Data Mapper/Domain/Models/Person";
import { DbManager } from "../../../../../../database/databases";
import PersonMapper from "../../../../../Data Patterns/Data Source/Data Mapper/Dao/Mappers/PersonMapper";
import PersonPropsSet from "../../../../../Data Patterns/Data Source/Data Mapper/Dao/Entities/PersonPropsSet";
import IPerson from "../../../../../Data Patterns/Data Source/Data Mapper/Domain/Models/IPerson";
import ARepository from "./ARepository";
import EmailRepository from "./EmailRepository";
import EmailPropsSet from "../../../../../Data Patterns/Data Source/Data Mapper/Dao/Entities/EmailPropsSet";

export default class PersonRepository extends ARepository<IPerson> {
  public constructor(
    private readonly dbMng: DbManager,
    private readonly mapper: PersonMapper,
    private readonly emailRep: EmailRepository,
  ) {
    super();
  }

  public find(id: number): Promise<IPerson | null> {
    return this.dbMng
      .selectById('persons', id)
      .then(async row => {
        if (row) {
          const person = await this.mapper.mapEntity(
            new Person(),
            row as unknown as PersonPropsSet
          )
          return person.setEmail(
            (await this.findEmail(row['email_id'])).mail
          )
        }

        return null;
      });
  }

  private findEmail(id: number): Promise<EmailPropsSet> {
    return this.emailRep.find(id);
  }
}
