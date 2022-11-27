import { db } from "../../../../database/db";
import { dateToDatabase, handlePromiseError } from "./utils";

export const createContract = () => new Promise<number>(
  (resolve, reject) => db.run(
    `INSERT INTO contracts(money)
     VALUES (0)`,
    function(err) {
      handlePromiseError(reject, err);
      resolve(this.lastID);
    }
  )
);

export const removeProducts = (): Promise<null> => new Promise(
  (resolve, reject) => db.run(
    'DELETE FROM products WHERE TRUE',
    (err) => {
      handlePromiseError(reject, err);
      resolve(null);
    }
  )
);

export const createProduct = ({contractId, type, day, price}) => new Promise<number>(
  (resolve, reject) => db.run(
    `INSERT INTO products(contract_id, type, start_date, price)
     VALUES (?, ?, ?, ?)`,
    [
      contractId,
      type,
      dateToDatabase(makeDate(day)),
      price,
    ],
    function(err) {
      handlePromiseError(reject, err);
      resolve(this.lastID);
    }
  )
);

export const getContractMoney = (id: number): Promise<number> => {
  return new Promise((resolve, reject) => db.get(
    'SELECT money FROM contracts WHERE id = ?',
    [id],
    (err, row) => {
      handlePromiseError(reject, err);
      resolve(row['money']);
    }
  ));
}

export const makeDate = (day: number) => {
  const date = (new Date())

  date.setTime(
    (new Date()).getTime() - (day - 1) * 1000 * 60 * 60 * 24
  );

  return date;
}
