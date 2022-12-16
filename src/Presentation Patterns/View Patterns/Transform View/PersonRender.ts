import PersonTransformView from "./PersonTransformView";
import IPerson from "../../../Data Patterns/Data Source/Data Mapper/Domain/Models/IPerson";
import * as fs from 'fs';
import { xsltProcess, xmlParse } from 'xslt-processor'

export default class PersonRender {
  private readonly transformer = new PersonTransformView();

  public transform(person: IPerson): string {
    const xmlString = this.transformer.toXml(person);
    const xsltString = fs.readFileSync(__dirname + '/xslt/person.xslt').toString();

    return xsltProcess(
      xmlParse(xmlString),
      xmlParse(xsltString)
    );
  }
}
