import RecognitionService from "./RecognitionService";
import { ProductType } from "../Enums/ProductType";
import { initDb } from "../../../../database/db";
import { createContract, createProduct, getContractMoney, removeProducts } from "../Utils/database";
import { updateRevenueSets } from "../Tests data/updateRevenueSets";

const TYPE_SHORT = {
  [ProductType.WORD_PROCESSOR]: 'WP',
  [ProductType.DATABASE]: 'DB',
  [ProductType.SPREADSHEET]: 'SS',
};

describe('RecognitionService by Transaction script', () => {
  const finance = new RecognitionService();
  let contractId: number | null = null;

  beforeAll(async () => {
    initDb();
    contractId = await createContract();
  });

  beforeEach(async () => {
    await removeProducts();
  })

  describe('updateRevenue()', () => {
    updateRevenueSets
      .forEach(({products, expectedMoney: expectedMoney}) => {
        const title = products.reduce(
          (title, {type, day}) => title + ` ${TYPE_SHORT[type]} : ${day} ;`,
          ''
        );

        test(title, async () => {
          await Promise.all(
            products.map(
              async productData => await createProduct({contractId, ...productData})
            )
          );

          const revenue = await finance.updateRevenue(contractId)

          expect(revenue).toEqual(expectedMoney);
          expect(await getContractMoney(contractId)).toEqual(expectedMoney);
        });
      })
  });
});
