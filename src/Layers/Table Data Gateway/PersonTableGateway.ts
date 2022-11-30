import { db } from "../../../database/db";
import { handlePromiseError } from "../../Utils/utils";
import Person from "./Person";

export default class PersonTableGateway {
  public findAll(): Promise<Person[]> {
    return new Promise((resolve, reject) => db.all(
        'SELECT id, first_name, last_name, email FROM persons',
        (err, rows) => {
          handlePromiseError(reject, err);
          resolve(rows);
        }
      )
    );
  }

  public find(id: number): Promise<Person | null> {
    return new Promise((resolve, reject) => db.get(
      'SELECT id, first_name, last_name, email FROM persons WHERE id = ?',
      [id],
      (err, row) => {
        handlePromiseError(reject, err);
        resolve(row);
      }
    ));
  }

  public create(firstName: string, lastName: string, email: string): Promise<number> {
    return new Promise((resolve, reject) => db.run(
      'INSERT INTO persons(first_name, last_name, email) VALUES(?, ?, ?)',
      [firstName, lastName, email],
      function(err) {
        handlePromiseError(reject, err);
        resolve(this.lastID);
      }
    ));
  }

  public update(id: number, firstName: string, lastName: string, email: string): Promise<boolean> {
    return new Promise((resolve, reject) => db.run(
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
    return new Promise((resolve, reject) => db.run(
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
