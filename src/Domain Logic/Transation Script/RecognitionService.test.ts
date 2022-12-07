import RecognitionService from "./RecognitionService";
import { ProductType } from "../enums/ProductType";
import { createContract, createProduct, getContractMoney } from "../utils/database";
import { updateRevenueSets } from "../tests data/updateRevenueSets";
import { commonDbm } from "../../../database/databases";

const TYPE_SHORT = {
  [ProductType.WORD_PROCESSOR]: 'WP',
  [ProductType.DATABASE]: 'DB',
  [ProductType.SPREADSHEET]: 'SS',
};

describe('RecognitionService by Transaction script', () => {
  const finance = new RecognitionService();
  let contractId: number | null = null;

  beforeAll(async () => {
    commonDbm.init();
    contractId = await createContract();
  });

  beforeEach(async () => await commonDbm.clearTable('products'))

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
