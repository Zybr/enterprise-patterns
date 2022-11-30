import RecognitionService from "./RecognitionService";
import { ProductType } from "../Enums/ProductType";
import { db, initDb } from "../../../../database/db";
import { createContract, createProduct, getContractMoney } from "../Utils/database";
import ContractEntity from "./Entities/ContractEntity";
import { updateRevenueSets } from "../Tests data/updateRevenueSets";
import { handlePromiseError } from "../../../Utils/utils";
import { clearTable } from "../../../Utils/database";

const TYPE_SHORT = {
  [ProductType.WORD_PROCESSOR]: 'WP',
  [ProductType.DATABASE]: 'DB',
  [ProductType.SPREADSHEET]: 'SS',
};

const getContractById = (id: number): Promise<ContractEntity> => {
  return new Promise<ContractEntity>(((resolve, reject) => {
    db.get(
      'SELECT id, money FROM contracts WHERE id = ?',
      [id],
      (err, row) => {
        if (!err && !row) {
          err = new Error(`There is not Contract with ID: ${id}`);
        }

        handlePromiseError(reject, err);
        resolve(
          new ContractEntity()
            .setId(row['id'])
            .setMoney(row['money'])
        )
      }
    )
  }));
}

describe('RecognitionService by Table module', () => {
  const finance = new RecognitionService();
  let contract: ContractEntity;

  beforeAll(async () => {
    initDb();
    const contractId = await createContract();
    contract = await getContractById(contractId);
  });

  beforeEach(async () => {
    await clearTable('products');
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
              async productData => await createProduct({
                contractId: contract.getId(),
                ...productData
              })
            )
          );

          await finance.updateRevenue(contract)

          expect(contract.getMoney()).toEqual(expectedMoney);
          expect(await getContractMoney(contract.getId())).toEqual(expectedMoney);
        });
      })
  });
});
