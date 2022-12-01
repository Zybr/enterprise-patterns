import ActiveRecord from "./ActiveRecord";
import { Database } from "sqlite3"
import { handlePromiseError } from "../../Utils/utils";

export default class PersonActiveRecord extends ActiveRecord {
  private static db: Database;

  private firstName: string = '';
  private lastName: string = '';
  private email: string = '';

  public static setDb(db: Database): void {
    PersonActiveRecord.db = db;
  }

  protected getFieldsGetters(): {} {
    return {
      first_name: this.getFirstName.bind(this),
      last_name: this.getLastName.bind(this),
      email: this.getEmail.bind(this),
    }
  }

  protected getTableName(): string {
    return 'persons';
  }

  public static findAll(): Promise<PersonActiveRecord[]> {
    return new Promise((resolve, reject) => this.db.all(
        'SELECT id, first_name, last_name, email FROM persons',
        (err, rows) => {
          handlePromiseError(reject, err);
          resolve(rows.map(PersonActiveRecord.makeSelf));
        }
      )
    );
  }

  public static find(id: number): Promise<PersonActiveRecord | null> {
    return new Promise((resolve, reject) => PersonActiveRecord.db.get(
      'SELECT id, first_name, last_name, email FROM persons WHERE id = ?',
      [id],
      (err, row) => {
        handlePromiseError(reject, err);
        resolve(row ? PersonActiveRecord.makeSelf(row) : null);
      }
    ));
  }

  public setFirstName(firstName: string): this {
    this.firstName = firstName;
    return this;
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public setLastName(lastName: string): this {
    this.lastName = lastName;
    return this;
  }

  public getLastName(): string {
    return this.lastName;
  }


  public setEmail(email: string): this {
    this.email = email;
    return this;
  }

  public getEmail(): string {
    return this.email;
  }

  /**
   * Here can be defined any business logic related to the model
   */

  private static makeSelf(row: []): PersonActiveRecord {
    return new PersonActiveRecord(PersonActiveRecord.db)
      .setId(row['id'])
      .setFirstName(row['first_name'])
      .setLastName(row['last_name'])
      .setEmail(row['email'])
  }
}
