import Finance from "./Finance";
import { ProductType } from "./Enums/ProductType";
import { db, initDb } from "../../../database/db";

const BUDGET_ID = 1;

const TYPE_SHORT = {
  [ProductType.WORD_PROCESSOR]: 'WP',
  [ProductType.DATABASE]: 'DB',
  [ProductType.SPREADSHEET]: 'SS',
};

const removeProducts = (): Promise<null> => new Promise(
  (resolve, reject) => db.run(
    'DELETE FROM products WHERE TRUE',
    (err) => {
      handleDbError(reject, err);
      resolve(null);
    }
  )
);

const createProduct = ({type, day, price}) => new Promise<number>(
  (resolve, reject) => db.run(
    `INSERT INTO products(type, start_date, price)
     VALUES (?, ?, ?)`,
    [
      type,
      formatDate(makeDate(day)),
      price,
    ],
    function(err) {
      handleDbError(reject, err);
      resolve(this.lastID);
    }
  )
);

const getBudgetMoney = (): Promise<number> => {
  return new Promise((resolve, reject) => db.get(
    'SELECT money FROM budgets WHERE id = ?',
    [BUDGET_ID],
    (err, row) => {
      handleDbError(reject, err);
      resolve(row['money']);
    }
  ));
}

const handleDbError = (reject, err?: Error) => {
  if (err) {
    reject(err);
  }
}

const makeDate = (day: number) => {
  const date = (new Date())

  date.setTime(
    (new Date()).getTime() - (day - 1) * 1000 * 60 * 60 * 24
  );

  return date;
}

const formatDate = (date: Date): string => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

describe('Finance', () => {
  const finance = new Finance();
  const fullPrice = 100;

  beforeAll(initDb);

  describe('updateRevenue()', () => {
    [
      // "Word processor" product
      {
        products: [
          {
            type: ProductType.WORD_PROCESSOR,
            day: 1,
            price: fullPrice,
          }
        ],
        expectedMoney: fullPrice,
      },

      // "Database" product
      {
        products: [
          {
            type: ProductType.DATABASE,
            day: 1,
            price: fullPrice
          }
        ],
        expectedMoney: Math.round(fullPrice / 3),
      },
      {
        products: [
          {
            type: ProductType.DATABASE,
            day: 29,
            price: fullPrice
          }
        ],
        expectedMoney: Math.round(fullPrice / 3),
      },
      {
        products: [
          {
            type: ProductType.DATABASE,
            day: 30,
            price: fullPrice
          }
        ],
        expectedMoney: Math.round(fullPrice / 3 * 2),
      },
      {
        products: [
          {
            type: ProductType.DATABASE,
            day: 59,
            price: fullPrice
          }
        ],
        expectedMoney: Math.round(fullPrice / 3 * 2),
      },
      {
        products: [
          {
            type: ProductType.DATABASE,
            day: 60,
            price: fullPrice
          }
        ],
        expectedMoney: Math.round(fullPrice),
      },

      // "Spreadsheet" product
      {
        products: [
          {
            type: ProductType.SPREADSHEET,
            day: 1,
            price: fullPrice,
          }
        ],
        expectedMoney: Math.round(fullPrice / 3),
      },
      {
        products: [
          {
            type: ProductType.SPREADSHEET,
            day: 59,
            price: fullPrice,
          }
        ],
        expectedMoney: Math.round(fullPrice / 3),
      },
      {
        products: [
          {
            type: ProductType.SPREADSHEET,
            day: 60,
            price: fullPrice,
          }
        ],
        expectedMoney: Math.round(fullPrice / 3 * 2),
      },
      {
        products: [
          {
            type: ProductType.SPREADSHEET,
            day: 89,
            price: fullPrice,
          }
        ],
        expectedMoney: Math.round(fullPrice / 3 * 2),
      },
      {
        products: [
          {
            type: ProductType.SPREADSHEET,
            day: 90,
            price: fullPrice,
          }
        ],
        expectedMoney: Math.round(fullPrice),
      },
      {
        products: [
          {
            type: ProductType.WORD_PROCESSOR,
            day: 2,
            price: 10,
          }, // 10
          {
            type: ProductType.DATABASE,
            day: 1,
            price: 100,
          }, // 33
          {
            type: ProductType.DATABASE,
            day: 30,
            price: 100,
          }, // 67
          {
            type: ProductType.DATABASE,
            day: 60,
            price: 100,
          }, // 100
          {
            type: ProductType.SPREADSHEET,
            day: 1,
            price: 1000,
          }, // 330
          {
            type: ProductType.SPREADSHEET,
            day: 60,
            price: 1000,
          }, // 670
          {
            type: ProductType.SPREADSHEET,
            day: 90,
            price: 1000,
          } // 1000
        ],
        expectedMoney: 10 + 33 + 67 + 100 + 330 + 670 + 1000,
      },
    ].forEach(({products, expectedMoney: expectedMoney}) => {
      const title = products.reduce(
        (title, {type, day}) => title + ` ${TYPE_SHORT[type]} : ${day} ;`,
        ''
      )

      test(title, async () => {
        await removeProducts();
        await Promise.all(
          products.map(
            async productData => await createProduct(productData)
          )
        );

        await finance.updateRevenue()

        expect(await getBudgetMoney()).toEqual(expectedMoney);
      });
    })
  });
});
