import { ProductType } from "../Enums/ProductType";

export { updateRevenueSets }

const fullPrice = 100;

const updateRevenueSets = [
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
]
