import ICommand from "./Commands/ICommand";
import UpdateRevenueCommand from "./Commands/UpdateRevenueCommand";
import RecognitionService from "../../../Domain Logic/Transation Script/RecognitionService";
import RevenueView from "./Views/RevenueView";

export default class CommandsFactory {
  public makeCommand(name: string): ICommand {
    switch (name) {
      case 'update-revenue':
        return new UpdateRevenueCommand(new RecognitionService(), new RevenueView());
      default:
        throw new Error(`There is no command with name ${name}.`);
    }
  }
}
