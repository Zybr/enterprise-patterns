import { DbManager } from "../../../../../../database/databases";
import EmailMapper from "../../../../../Data Patterns/Data Source/Data Mapper/Dao/Mappers/EmailMapper";
import EmailPropsSet from "../../../../../Data Patterns/Data Source/Data Mapper/Dao/Entities/EmailPropsSet";
import ARepository from "./ARepository";

export default class EmailRepository extends ARepository<EmailPropsSet> {
  public constructor(
    private readonly dbMng: DbManager,
    private readonly mapper: EmailMapper,
  ) {
    super()
  }

  public find(id: number): Promise<EmailPropsSet | null> {
    return this.dbMng
      .selectById('emails', id)
      .then(row =>
        row === null
          ? null
          : this.mapper.mapEntity({} as EmailPropsSet, row as unknown as EmailPropsSet)
      );
  }
}
