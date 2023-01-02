export default interface IFrontController {
  handleCommand(commandName: string, ...args: any[]): Promise<string>;
}
