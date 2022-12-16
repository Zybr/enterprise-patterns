import action from "./decorators/action";

export default class ApplicationController {
  @action('get-person')
  public getPerson(id: number, command: any, view: any): Promise<string> {
    return command(id).then(view) // Fetch model => render model => return HTML
  }
}
