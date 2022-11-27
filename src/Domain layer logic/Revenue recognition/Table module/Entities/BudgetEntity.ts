import IdMixin from "./Mixins/IdMixin";
import ProductEntity from "./ProductEntity";
import { db } from "../../../../../database/db";
import Entity from "./Entity";
import { handlePromiseError } from "../../Utils/utils";

export default class BudgetEntity extends IdMixin(Entity) {
  private money: number = 0;

  public save(): Promise<this> {
    const self = this;

    return this.isNew()
      ? new Promise<this>(
        (resolve, reject) => db.run(
          `INSERT INTO budgets(money)
           VALUES (0)`,
          function(err) {
            handlePromiseError(reject, err);
            self.setId(this.lastID)
            resolve(self);
          }
        )
      )
      : new Promise<this>(
        (resolve, reject) => db.run(
          `UPDATE budgets
           SET money = ?
           WHERE id = ?`,
          [self.getMoney(), self.getId()],
          (err) => {
            handlePromiseError(reject, err);
            resolve(self);
          }
        )
      );
  }

  public getProducts(): Promise<ProductEntity[]> {
    return new Promise((resolve, reject) => db.all(
      "SELECT id, type, start_date, price FROM products",
      (err, rows: [][]) => {
        handlePromiseError(reject, err);
        resolve(
          rows.map(
            row => new ProductEntity(parseInt(row['budget_id']), row['type'])
              .setId(row['id'])
              .setStartDate(new Date(Date.parse(row['start_date'])))
              .setPrice(row['price'])
          )
        );
      }
    ));
  }

  public setMoney(money: number): this {
    this.money = money;
    return this;
  }

  public getMoney(): number {
    return this.money;
  }
}
