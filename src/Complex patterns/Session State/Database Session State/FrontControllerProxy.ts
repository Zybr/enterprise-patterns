import FrontController from "../../../Presentation Patterns/Controllers/Front Controller/FrontController";
import History from "./History";
import IFrontController from "../Server Session State/IFrontController";

export default class FrontControllerProxy implements IFrontController {
  constructor(
    private readonly controller: FrontController,
    private readonly history: History,
  ) {
  }

  public handleCommand(sessionId: string, commandName: string, ...args: any[]): Promise<string> {
    return this.history
      .add(
        sessionId,
        {
          name: commandName,
          args,
        }
      )
      .then(
        () => this.controller.handleCommand(commandName, ...args)
      );
  }
}
