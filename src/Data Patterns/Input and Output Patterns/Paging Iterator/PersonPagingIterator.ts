import { Database } from "sqlite3"
import PersonObjectFactory from "../Domain Object Factory/PersonObjectFactory";
import Page from "./Page";
import Person from "../models/Person";
import { handlePromiseError } from "../../../utils/utils";

export default class PersonPagingIterator {
  private readonly db: Database;
  private readonly factory: PersonObjectFactory;
  private start: number = 0;

  public constructor(database: Database) {
    this.db = database;
    this.factory = new PersonObjectFactory();
  }

  public getNext(size: number): Promise<Page<Person>> {
    return new Promise<Page<Person>>((resolve, reject) => {
      this.db.all(
        `SELECT *
         FROM persons
         LIMIT ? OFFSET ?`,
        [size, this.start],
        (err, rows: [][]) => {
          handlePromiseError(reject, err);
          const persons = rows.map(row => this.factory.newPerson(row));
          this.start += size;
          resolve(new Page<Person>(persons));
        }
      )
    })
  }
}
