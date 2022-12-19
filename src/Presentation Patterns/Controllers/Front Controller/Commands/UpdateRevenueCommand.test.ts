import RecognitionService from "../../../../Domain Logic/Transation Script/RecognitionService";
import RevenueView from "../Views/RevenueView";
import UpdateRevenueCommand from "./UpdateRevenueCommand";

describe('UpdateRevenueCommand', () => {
  test('execute', async () => {
    const contractId = 1;
    const revenueValue = 2;
    const renderResult = '2';

    const service = new RecognitionService();
    const view = new RevenueView();
    const updateMethod = jest.spyOn(service, 'updateRevenue')
      .mockImplementation(() => Promise.resolve(revenueValue as any))
    const renderMethod = jest.spyOn(view, 'render')
      .mockImplementation(() => renderResult)
    const command = new UpdateRevenueCommand(service, view);

    expect(await command.execute(contractId)) // Execute
      .toEqual(renderResult); // Return valid markup

    expect(updateMethod.mock.calls).toEqual([ // Was updated
      [contractId]
    ]);
    expect(renderMethod.mock.calls).toEqual([ // Was rendered
      [revenueValue]
    ]);
  });
});
