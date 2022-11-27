import Finance from "./Finance";
import { ProductType } from "../Enums/ProductType";
import { db, initDb } from "../../../../database/db";
import { createBudget, createProduct, removeBudgets, removeProducts } from "../Utils/database";
import BudgetEntity from "./Entities/BudgetEntity";
import { handlePromiseError } from "../Utils/utils";
import { updateRevenueSets } from "../Tests data/updateRevenueSets";

const TYPE_SHORT = {
  [ProductType.WORD_PROCESSOR]: 'WP',
  [ProductType.DATABASE]: 'DB',
  [ProductType.SPREADSHEET]: 'SS',
};

const getBudgetById = (id: number): Promise<BudgetEntity> => {
  return new Promise<BudgetEntity>(((resolve, reject) => {
    db.get(
      'SELECT id, money FROM budgets WHERE id = ?',
      [id],
      (err, row) => {
        if (!err && !row) {
          err = new Error(`There is not Budget with ID: ${id}`);
        }

        handlePromiseError(reject, err);
        resolve(
          new BudgetEntity()
            .setId(row['id'])
            .setMoney(row['money'])
        )
      }
    )
  }));
}

describe('Finance', () => {
  const finance = new Finance();
  let budget: BudgetEntity;

  beforeAll(async () => {
    initDb();
    await removeBudgets();
    const budgetId = await createBudget();
    budget = await getBudgetById(budgetId);
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
              async productData => await createProduct({
                budgetId: budget.getId(),
                ...productData
              })
            )
          );

          await finance.updateRevenue(budget)

          expect(budget.getMoney()).toEqual(expectedMoney);
        });
      })
  });
});
