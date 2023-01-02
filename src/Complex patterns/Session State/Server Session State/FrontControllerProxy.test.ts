import FrontController from "../../../Presentation Patterns/Controllers/Front Controller/FrontController";
import FrontControllerProxy from "./FrontControllerProxy";
import History from "./History";
import { commonDbm } from "../../../../database/databases";
import { generateUid } from "../../../utils/utils";

describe('FrontControllerProxy', () => {
  const history = new History(__dirname + '/history/');
  const controller = new FrontController();
  const proxy = new FrontControllerProxy(controller, history)
  const sessionId = generateUid();

  beforeAll(async () => {
    await commonDbm.init();
    history.clear(sessionId);
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

    expect(history.list(sessionId)).toEqual(commands);
  });
});
