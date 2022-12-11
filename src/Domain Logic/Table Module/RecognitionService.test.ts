import RecognitionService from "./RecognitionService";
import { ProductType } from "../enums/ProductType";
import { createContract, createProduct, getContractMoney } from "../utils/database";
import ContractEntity from "./Entities/ContractEntity";
import { updateRevenueSets } from "../tests data/updateRevenueSets";
import { handlePromiseError } from "../../utils/utils";
import { commonDbm } from "../../../database/databases";

const TYPE_SHORT = {
  [ProductType.WORD_PROCESSOR]: 'WP',
  [ProductType.DATABASE]: 'DB',
  [ProductType.SPREADSHEET]: 'SS',
};

const db = commonDbm.getDb();

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
    await commonDbm.init();
    const contractId = await createContract();
    contract = await getContractById(contractId);
  });

  beforeEach(async () => await commonDbm.clearTable('products'));

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
