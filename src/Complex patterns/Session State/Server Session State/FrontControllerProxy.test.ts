import FrontController from "../../../Presentation Patterns/Controllers/Front Controller/FrontController";
import FrontControllerProxy from "./FrontControllerProxy";
import History from "./History";
import { commonDbm } from "../../../../database/databases";

describe('FrontControllerProxy', () => {
  const history = new History(__dirname + '/history.txt');
  const controller = new FrontController();
  const proxy = new FrontControllerProxy(controller, history)

  beforeAll(async () => {
    await commonDbm.init();
    await history.clear();
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
      commands.map(command => proxy.handleCommand(command.name, ...command.args))
    );

    expect(history.list()).toEqual(commands);
  });
});
