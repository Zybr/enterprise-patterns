import History from "./History";
import { sessionDbm } from "../../../../database/databases";
import { generateUid } from "../../../utils/utils";
import FrontControllerProxy from "./FrontControllerProxy";
import FrontController from "../../../Presentation Patterns/Controllers/Front Controller/FrontController";

describe('FrontControllerProxy', () => {
  const history = new History(sessionDbm);
  const controller = new FrontController();
  const proxy = new FrontControllerProxy(controller, history)
  const sessionId = generateUid();

  beforeAll(async () => {
    await sessionDbm.init();
    await history.clear(sessionId);
  });

  test('handleCommand()', async () => {
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
      commands.map(command => proxy.handleCommand(sessionId, command.name, ...command.args))
    );

    expect(await history.list(sessionId)).toEqual(commands);
  });
});
