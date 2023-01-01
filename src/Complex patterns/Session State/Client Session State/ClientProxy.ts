import IClient from "./IClient";
import Command from "./Command";
import History from "./History";

export default class ClientProxy implements IClient {
  public constructor(
    private readonly client: IClient,
    private readonly history: History
  ) {
  }

  public send(command: Command): Promise<string> {
    this.history.add(command);
    return this.client.send(command)
  }

  public getHistory(): Command[] {
    return this.history.list() as Command[];
  }
}
