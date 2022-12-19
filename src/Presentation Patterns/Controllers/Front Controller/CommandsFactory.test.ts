import CommandsFactory from "./CommandsFactory";
import UpdateRevenueCommand from "./Commands/UpdateRevenueCommand";

describe('CommandsFactory', () => {
  const factory = new CommandsFactory();

  test('makeCommand()', () => {
    expect(factory.makeCommand('update-revenue')).toBeInstanceOf(UpdateRevenueCommand)
  });

  test('makeCommand() - not existed command', () => {
    const name = 'not-existed-command';
    expect(() => factory.makeCommand(name))
      .toThrow(new Error(`There is no command with name ${name}.`))
  });
});
