import { Database } from "sqlite3"
import { handlePromiseError } from "../../Utils/utils";
import RowDataGateway from "./RowDataGateway";

export class PersonRowDataGateway implements RowDataGateway {
  private static db: Database;
  private self = PersonRowDataGateway;

  private id: number | null = null;
  private firstName: string = '';
  private lastName: string = '';
  private email: string = '';

  public static setDb(db: Database) {
    PersonRowDataGateway.db = db;
  }

  public static findAll(): Promise<PersonRowDataGateway[]> {
    return new Promise((resolve, reject) => PersonRowDataGateway.db.all(
        'SELECT id, first_name, last_name, email FROM persons',
        (err, rows) => {
          handlePromiseError(reject, err);
          resolve(rows.map(this.makeSelf));
        }
      )
    );
  }

  public static find(id: number): Promise<PersonRowDataGateway | null> {
    return new Promise((resolve, reject) => PersonRowDataGateway.db.get(
      'SELECT id, first_name, last_name, email FROM persons WHERE id = ?',
      [id],
      (err, row) => {
        handlePromiseError(reject, err);
        resolve(row ? PersonRowDataGateway.makeSelf(row) : null);
      }
    ));
  }

  private static makeSelf(row: []): PersonRowDataGateway {
    return new PersonRowDataGateway()
      .setId(row['id'])
      .setFirstName(row['first_name'])
      .setLastName(row['last_name'])
      .setEmail(row['email'])
  }

  public setId(id: number): this {
    this.id = id;
    return this;
  }

  public getId(): number | null {
    return this.id;
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

  create(): Promise<this> {
    const self = this;
    return new Promise((resolve, reject) => this.self.db.run(
      'INSERT INTO persons(first_name, last_name, email) VALUES(?, ?, ?)',
      [this.firstName, this.lastName, this.email],
      function(err) {
        handlePromiseError(reject, err);
        self.id = this.lastID;
        resolve(self);
      }
    ));
  }

  update(): Promise<this> {
    return new Promise((resolve, reject) => this.self.db.run(
      `UPDATE persons
       SET first_name = ?,
           last_name  = ?,
           email      = ?
       WHERE id = ?`,
      [
        this.firstName,
        this.lastName,
        this.email,
        this.id,
      ],
      (err) => {
        handlePromiseError(reject, err);
        resolve(this);
      }
    ));
  }

  delete(): Promise<boolean> {
    return new Promise((resolve, reject) => this.self.db.run(
      `DELETE
       FROM persons
       WHERE id = ?`,
      [this.id],
      function(err) {
        handlePromiseError(reject, err);
        resolve(this.changes > 0);
      }
    ));
  }
}
