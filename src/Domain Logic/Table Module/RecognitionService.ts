import ProductEntity from "./Entities/ProductEntity";
import { ProductType } from "../enums/ProductType";
import ContractEntity from "./Entities/ContractEntity";
import { getPassedDays } from "../utils/utils";

export default class RecognitionService {

  /** Calculate and store total revenue of all products connected to the contract */
  public updateRevenue(contract: ContractEntity): Promise<ContractEntity> {
    return this.calculateTotalRecognition(contract)
      .then(totalRecognition => contract
        .setMoney(totalRecognition)
        .save()
      );
  }

  /** Calculate summary recognition of all products */
  private calculateTotalRecognition(contract: ContractEntity): Promise<number> {
    return contract
      .getProducts()
      .then(
        products => products.reduce( // Sum available money of each product
          (sum, product) => sum + this.calculateProductRecognition(product),
          0
        )
      );
  }

  /** Calculate recognition of specific product */
  private calculateProductRecognition(product: ProductEntity): number {
    const day = getPassedDays(product.getStartDate());
    const price = product.getPrice();

    switch (product.getType()) {
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
}
