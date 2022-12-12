import IModelFinder from "./IModelFinder";
import IPerson from "../../../Data Patterns/Data Source/Data Mapper/Domain/Models/IPerson";
import Person from "../../../Data Patterns/Data Source/Data Mapper/Domain/Models/Person";
import IdentityMap from "../IdentityMap";
import { Database } from "sqlite3";
import PersonMapper from "../../../Data Patterns/Data Source/Data Mapper/Dao/Mappers/PersonMapper";
import { handlePromiseError } from "../../../utils/utils";

export default class PersonFinder implements IModelFinder {
  constructor(
    private db: Database,
    private identityMap: IdentityMap,
    private mapper: PersonMapper
  ) {
  }

  public find(id: number): Promise<IPerson> {
    let model = this.identityMap.find(Person.name, id) as IPerson | null;

    if (model !== null) {
      return Promise.resolve(model);
    }

    return new Promise((resolve, reject) => this.db.get(
        `SELECT *
         FROM ${this.mapper.getTableName()}
         WHERE id = ?`,
        [id],
        (err, row) => {
          handlePromiseError(reject, err);
          const model = this.mapper.mapEntity(new Person(), row);
          this.identityMap.add(model);
          resolve(model)
        }
      )
    );
  }
}
