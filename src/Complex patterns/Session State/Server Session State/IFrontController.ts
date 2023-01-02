export default interface IFrontController {
  handleCommand(sessionId: string, commandName: string, ...args: any[]): Promise<string>;
}
