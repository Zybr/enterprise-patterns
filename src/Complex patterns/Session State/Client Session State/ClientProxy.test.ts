import Client from "./Client";
import FrontController from "../../../Presentation Patterns/Controllers/Front Controller/FrontController";
import ClientProxy from "./ClientProxy";
import History from "./History";
import { commonDbm } from "../../../../database/databases";

describe('ClientProxy', () => {
  const history = new History();
  const client = new ClientProxy(
    new Client(
      new FrontController()
    ),
    history
  )

  beforeAll(async () => {
    await commonDbm.init();
  });

  test('send() - info', async () => {
    const commands = [
      {
        name: 'update-revenue',
        args: [1],
      },
      {
        name: 'update-revenue',
        args: [2],
      },
      {
        name: 'update-revenue',
        args: [3],
      },
    ];


    await Promise.all(
      commands.map(command => client.send(command))
    );

    expect(client.getHistory()).toEqual(commands);
  });
});
