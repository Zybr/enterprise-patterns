import { ProductType } from "../Enums/ProductType";
import { getPassedDays } from "../Utils/utils";
import { handlePromiseError } from "../../../Utils/utils";
import { commonDbm } from "../../../../database/databases";

export default class RecognitionService {
  /** Business logic methods */

  /**
   * Calculate and store total revenue of all products connected to the contract/
   * @param contractId
   * @return Promise Current revenue
   */
  public updateRevenue(contractId: number): Promise<number> {
    return this
      .calculateTotalRecognition(contractId)
      .then(totalRecognition =>
        this.storeContract(contractId, totalRecognition)
          .then(() => totalRecognition)
      );
  }

  /** Calculate summary recognition of all products */
  private calculateTotalRecognition(contractId: number): Promise<number> {
    return this
      .fetchProducts(contractId) // Fetch all products from DB
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

  /** Get all contract products */
  private fetchProducts(contractId: number): Promise<[][]> {
    return new Promise((resolve, reject) => commonDbm.getDb().all(
      "SELECT id, type, start_date, price FROM products where contract_id = ?",
      [contractId],
      (err, rows: [][]) => {
        handlePromiseError(reject, err);
        resolve(rows);
      }
    ));
  }

  /** Save current recognition */
  private storeContract(contractId: number, money: number): Promise<boolean> {
    return new Promise(
      (resolve, reject) => commonDbm.getDb().run(
        'UPDATE contracts SET money = ? WHERE id = ?',
        [money, contractId],
        function(err) {
          handlePromiseError(reject, err);
          resolve(this.changes > 0);
        }
      )
    )
  }
}
