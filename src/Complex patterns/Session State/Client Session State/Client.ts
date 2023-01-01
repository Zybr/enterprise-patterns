import Command from "./Command";
import FrontController from "../../../Presentation Patterns/Controllers/Front Controller/FrontController";
import IClient from "./IClient";

export default class Client implements IClient {
  public constructor(
    private readonly controller: FrontController,
  ) {
  }

  public send(command: Command): Promise<string> {
    return this.controller.handleCommand(command.name, ...command.args);
  }
}
