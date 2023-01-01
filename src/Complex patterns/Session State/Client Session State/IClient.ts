import Command from "./Command";

export default interface IClient {
  send(command: Command): Promise<string>
}
