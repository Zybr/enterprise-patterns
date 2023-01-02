import CommandsFactory from "./CommandsFactory";

export default class FrontController {
  private readonly commandFactory = new CommandsFactory();

  public handleCommand(commandName: string, ...args: any[]): Promise<string> {
    return this.commandFactory
      .makeCommand(commandName) // Make the command instance
      .execute(...args); // Run the command and return its result
  }
}
