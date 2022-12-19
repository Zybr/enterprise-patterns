import * as fs from 'fs';
import ATemplateView from "../Template View/ATemplateView";
import PersonRenderObjectFactory from "./PersonRenderObjectFactory";

export default class PersonTemplateView extends ATemplateView {
  private readonly objectFactory = new PersonRenderObjectFactory();

  public render(person): string {
    return this.fillTemplate( // Make final HTML
      fs.readFileSync(__dirname + '/../Template View/templates/person.tpl').toString(), // Get template
      this.objectFactory.makeObject(person) // Make render object
    );
  }
}
