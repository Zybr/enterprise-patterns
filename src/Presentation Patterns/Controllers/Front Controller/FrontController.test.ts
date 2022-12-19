import FrontController from "./FrontController";
import { commonDbm } from "../../../../database/databases";
import { createContract, createProduct, getContractMoney } from "../../../Domain Logic/utils/database";
import { ProductType } from "../../../Domain Logic/enums/ProductType";

describe('FrontController', () => {
  const controller = new FrontController();
  let contractId: number | null = null;

  beforeAll(async () => {
    await commonDbm.init();
    contractId = await createContract();
  });

  test('handleCommand()', async () => {
    const expectedMoney = 4;
    const expectedMarkup = `<div>\n    <strong>Current revenue</strong>: <span>${expectedMoney}</span>\n</div>\n`;
    await createProduct({
      contractId,
      type: ProductType.DATABASE,
      day: 1,
      price: 12
    });

    const controllerResult = await controller.handleCommand('update-revenue', contractId)

    expect(controllerResult).toEqual(expectedMarkup);
    expect(await getContractMoney(contractId)).toEqual(expectedMoney);
  });
});
