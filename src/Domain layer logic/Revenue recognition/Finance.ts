import { db } from "../../../database/db";
import { ProductType } from "./Enums/ProductType";

export default class Finance {
  /** ID of record which keeps current total recognition */
  private readonly BUDGET_ID = 1;

  /** Business logic methods */

  public updateRevenue(): Promise<boolean> {
    return this.calculateTotalRecognition()
      .then(totalRecognition => this.storeBudget(totalRecognition));
  }

  /** Calculate summary recognition of all products */
  private calculateTotalRecognition(): Promise<number> {
    return this
      .fetchProducts() // Fetch all products from DB
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
    const day = this.calculateDay(date);

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

  /** Define how much days passed since the date */
  private calculateDay(date: Date): number {
    return Math.ceil(
      (new Date().getTime() - date.getTime())
      / (1000 * 60 * 60 * 24)
    );
  }

  /** DB methods */

  private fetchProducts(): Promise<[][]> {
    return new Promise((resolve, reject) => db.all(
      "SELECT id, type, start_date, price FROM products",
      (err, rows: [][]) => {
        this.handleError(reject, err);
        resolve(rows);
      }
    ));
  }

  /** Save current recognition */
  private storeBudget(money: number): Promise<boolean> {
    return this.hasBudget()
      .then(
        has => has
          ? this.updateBudget(money)
          : this.createBudget(money)
      );
  }

  private hasBudget(): Promise<boolean> {
    return new Promise((resolve, reject) => db.get(
      'SELECT * FROM budgets WHERE id = ?',
      [this.BUDGET_ID],
      (err, row: [] | undefined) => {
        this.handleError(reject, err);
        resolve(!!row)
      }
    ));
  }

  private createBudget(money: number): Promise<boolean> {
    const self = this;

    return new Promise(
      (resolve, reject) => db.run(
        'INSERT INTO budgets(id, money) VALUES (?, ?)',
        [this.BUDGET_ID, money],
        function(err) {
          self.handleError(reject, err);
          resolve(!!this.lastID)
        }
      )
    );
  }

  private updateBudget(money: number): Promise<boolean> {
    const self = this;
    return new Promise(
      (resolve, reject) => db.run(
        'UPDATE budgets SET money = ? WHERE id = ?',
        [money, this.BUDGET_ID],
        function(err) {
          self.handleError(reject, err);
          resolve(this.changes > 0);
        }
      )
    )
  }

  private handleError(reject, error?: Error) {
    if (error) {
      throw reject(error);
    }
  }
}
