import FrontController from "../../../Presentation Patterns/Controllers/Front Controller/FrontController";
import IFrontController from "./IFrontController";
import History from "./History";

export default class FrontControllerProxy implements IFrontController {
  constructor(
    private readonly controller: FrontController,
    private readonly history: History,
  ) {
  }

  public handleCommand(sessionId: string, commandName: string, ...args: any[]): Promise<string> {
    this.history.add(
      sessionId,
      {
        name: commandName,
        args,
      }
    );

    return this.controller.handleCommand(commandName, ...args);
  }
}
