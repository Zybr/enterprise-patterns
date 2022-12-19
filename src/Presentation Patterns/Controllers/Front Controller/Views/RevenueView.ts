import ATemplateView from "../../../View Patterns/Template View/ATemplateView";
import * as fs from 'fs';

export default class RevenueView extends ATemplateView {
  public render(revenue: number): string {
    return this.fillTemplate(
      fs.readFileSync(__dirname + '/templates/revenue.tpl').toString(),
      {revenue}
    );
  }
}
