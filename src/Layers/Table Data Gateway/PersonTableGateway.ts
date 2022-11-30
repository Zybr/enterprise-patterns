import { Database } from "sqlite3"
import { handlePromiseError } from "../../Utils/utils";
import PersonData from "../Types/PersonData";

export default class PersonTableGateway {
  private db: Database;

  public constructor(db: Database) {
    this.db = db;
  }

  public findAll(): Promise<PersonData[]> {
    return new Promise((resolve, reject) => this.db.all(
        'SELECT id, first_name, last_name, email FROM persons',
        (err, rows) => {
          handlePromiseError(reject, err);
          resolve(rows);
        }
      )
    );
  }

  public find(id: number): Promise<PersonData | null> {
    return new Promise((resolve, reject) => this.db.get(
      'SELECT id, first_name, last_name, email FROM persons WHERE id = ?',
      [id],
      (err, row) => {
        handlePromiseError(reject, err);
        resolve(row);
      }
    ));
  }

  public create(firstName: string, lastName: string, email: string): Promise<number> {
    return new Promise((resolve, reject) => this.db.run(
      'INSERT INTO persons(first_name, last_name, email) VALUES(?, ?, ?)',
      [firstName, lastName, email],
      function(err) {
        handlePromiseError(reject, err);
        resolve(this.lastID);
      }
    ));
  }

  public update(id: number, firstName: string, lastName: string, email: string): Promise<boolean> {
    return new Promise((resolve, reject) => this.db.run(
      `UPDATE persons
       SET first_name = ?,
           last_name  = ?,
           email      = ?
       WHERE id = ?`,
      [
        firstName,
        lastName,
        email,
        id,
      ],
      function(err) {
        handlePromiseError(reject, err);
        resolve(this.changes > 0);
      }
    ));
  }

  public delete(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => this.db.run(
      `DELETE
       FROM persons
       WHERE id = ?`,
      [id],
      function(err) {
        handlePromiseError(reject, err);
        resolve(this.changes > 0);
      }
    ));
  }
}
