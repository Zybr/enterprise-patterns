import Action from "./ActionEnum";

export default class RequestFactory {
  private readonly rootNamespace = 'http://schemas.xmlsoap.org/soap/envelope/';
  private readonly bodyNamespace = 'http://tempuri.org/';

  public makeHeaders(action: Action): HeadersInit {
    return {
      'Content-Type': 'text/xml; charset=utf-8',
      SOAPAction: `http://tempuri.org/${action.toString()}`
    }
  }

  public makeBody(action: Action, intA: number, intB: number): Object {
    return {
      'soap:Envelope': [
        {
          _attr: {
            'xmlns:soap': this.rootNamespace,
          },
        },
        {
          'soap:Body': [
            {
              [action.toString()]: [
                {
                  _attr: {
                    xmlns: this.bodyNamespace,
                  }
                },
                {
                  intA,
                },
                {
                  intB,
                },
              ]
            }
          ]
        }
      ]
    };
  }
}
