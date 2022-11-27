import Finance from "./Finance";
import { ProductType } from "../Enums/ProductType";
import { initDb } from "../../../../database/db";
import { createBudget, createProduct, getBudgetMoney, removeBudgets, removeProducts } from "../Utils/database";
import { updateRevenueSets } from "../Tests data/updateRevenueSets";

const TYPE_SHORT = {
  [ProductType.WORD_PROCESSOR]: 'WP',
  [ProductType.DATABASE]: 'DB',
  [ProductType.SPREADSHEET]: 'SS',
};

describe('Finance', () => {
  const finance = new Finance();
  let budgetId: number | null = null;

  beforeAll(async () => {
    initDb();
    await removeBudgets();
    budgetId = await createBudget();
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
              async productData => await createProduct({budgetId, ...productData})
            )
          );

          await finance.updateRevenue(budgetId)

          expect(await getBudgetMoney(budgetId)).toEqual(expectedMoney);
        });
      })
  });
});
