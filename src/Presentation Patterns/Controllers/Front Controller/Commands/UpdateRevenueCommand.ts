import RecognitionService from "../../../../Domain Logic/Transation Script/RecognitionService";
import RevenueView from "../Views/RevenueView";
import ICommand from "./ICommand";

export default class UpdateRevenueCommand implements ICommand {
  public constructor(
    private readonly service: RecognitionService,
    private readonly view: RevenueView,
  ) {
  }

  public execute(contractId): Promise<string> {
    return this.service
      .updateRevenue(contractId)
      .then(revenue => this.view.render(revenue));
  }
}
