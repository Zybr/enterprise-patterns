import sxml = require("sxml");
import XML = sxml.XML;
import RequestFactory from "./RequestFactory";
import Action from "./ActionEnum";
import { IClient } from "./IClient";

const xml = require('xml');

export default class Calculator {
  private readonly serviceUrl = 'http://www.dneonline.com/calculator.asmx';
  private readonly factory = new RequestFactory();

  public constructor(
    private readonly client: IClient
  ) {
  }

  public async add(intA: number, intB: number): Promise<number> {
    return this.doActon(Action.ADD, intA, intB);
  }

  public async subtract(intA: number, intB: number): Promise<number> {
    return this.doActon(Action.SUBTRACT, intA, intB);
  }

  public async multiply(intA: number, intB: number): Promise<number> {
    return this.doActon(Action.MULTIPLY, intA, intB);
  }

  public async divide(intA: number, intB: number): Promise<number> {
    return this.doActon(Action.DIVIDE, intA, intB);
  }

  private doActon(action: Action, intA: number, intB: number): Promise<number> {
    return this.client.request(
      this.serviceUrl,
      {
        method: 'POST',
        headers: this.factory.makeHeaders(action),
        body: xml(
          this.factory.makeBody(action, intA, intB),
          {declaration: true}
        ),
      }
    )
      .then(res => res.text())
      .then(xmlText => this.getResult(xmlText, action));
  }

  private getResult(xmlText: string, action: Action): number {
    return parseInt(
      (new XML(xmlText))
        .get("soap:Body").at(0)
        .get(`${action.toString()}Response`).at(0)
        .get(`${action.toString()}Result`).at(0)
        .getValue()
    );
  }
}
