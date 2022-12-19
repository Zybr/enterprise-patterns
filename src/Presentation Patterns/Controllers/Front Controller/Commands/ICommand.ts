export default interface ICommand {
  /** Execute the command and return markup of the result */
  execute(...args: any[]): Promise<string>;
}
