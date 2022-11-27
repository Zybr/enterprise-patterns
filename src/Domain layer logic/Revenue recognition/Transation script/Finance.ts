import { db } from "../../../../database/db";
import { ProductType } from "../Enums/ProductType";
import { getPassedDays, handlePromiseError } from "../Utils/utils";

export default class Finance {
  /** Business logic methods */

  /** Calculate and store total revenue of all products connected to the budget */
  public updateRevenue(budgetId: number): Promise<boolean> {
    return this.calculateTotalRecognition(budgetId)
      .then(totalRecognition => this.storeBudget(budgetId, totalRecognition));
  }

  /** Calculate summary recognition of all products */
  private calculateTotalRecognition(budgetId: number): Promise<number> {
    return this
      .fetchProducts(budgetId) // Fetch all products from DB
      .then(
        products => products.reduce( // Sum available money of each product
          (sum, product) => sum + this.calculateProductRecognition( // Define available money of product
            product['type'],
            new Date(Date.parse(product['start_date'])),
            parseInt(product['price'])
          ),
          0
        )
      );
  }

  /** Calculate recognition of specific product */
  private calculateProductRecognition(type: string, date: Date, price: number): number {
    const day = getPassedDays(date);

    switch (type) {
      case ProductType.WORD_PROCESSOR:
        return price;
      case ProductType.DATABASE:
        if (day < 30) {
          return Math.round(price / 3)
        }

        if (day < 60) {
          return Math.round(price / 3 * 2)
        }

        return price;
      case ProductType.SPREADSHEET:
        if (day < 60) {
          return Math.round(price / 3)
        }

        if (day < 90) {
          return Math.round(price / 3 * 2)
        }

        return price;
      default:
        throw new Error('Products type is not supported.')
    }
  }

  /** DB methods */

  /** Get all budget products */
  private fetchProducts(budgetId: number): Promise<[][]> {
    return new Promise((resolve, reject) => db.all(
      "SELECT id, type, start_date, price FROM products where budget_id = ?",
      [budgetId],
      (err, rows: [][]) => {
        handlePromiseError(reject, err);
        resolve(rows);
      }
    ));
  }

  /** Save current recognition */
  private storeBudget(budgetId: number, money: number): Promise<boolean> {
    return new Promise(
      (resolve, reject) => db.run(
        'UPDATE budgets SET money = ? WHERE id = ?',
        [money, budgetId],
        function(err) {
          handlePromiseError(reject, err);
          resolve(this.changes > 0);
        }
      )
    )
  }
}
