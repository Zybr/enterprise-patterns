import { db } from "../../../../database/db";
import { dateToDatabase, handlePromiseError } from "../../../Utils/utils";
import { insert } from "../../../Utils/database";

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

export const createProduct = ({contractId, type, day, price}) => insert(
  'products',
  {
    contract_id: contractId,
    start_date: dateToDatabase(makeDate(day)),
    type,
    price,
  }
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
