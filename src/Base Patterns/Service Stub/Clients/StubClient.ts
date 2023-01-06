import { IClient } from "../../../Complex patterns/Distribution Patterns/Remote Facade/Calculator/IClient";

type RequestParams = {
  method: string,
  headers: {
    'Content-Type': string,
    SOAPAction: string,
  },
  body: string,
}

export default class StubClient implements IClient {
  public request(url, params: RequestParams): Promise<Response> {
    const action = params.headers.SOAPAction.split('/').pop().toLowerCase();
    const numA = this.getNumA(params.body);
    const numB = this.getNumB(params.body);

    const body = {
      add: (a, b) => this.makeAddBody(a, b),
      subtract: (a, b) => this.makSubtractBody(a, b),
      multiply: (a, b) => this.makeMultiplyBody(a, b),
      divide: (a, b) => this.getDivideBody(a, b),
    }[action](numA, numB);

    return Promise.resolve(new Response(body));
  }

  private getNumA(body: string): number {
    return parseInt(body.match(/<intA>(?<num>\d+)<\/intA>/).groups.num);
  }

  private getNumB(body: string): number {
    return parseInt(body.match(/<intB>(?<num>\d+)<\/intB>/).groups.num);
  }

  private makeAddBody(intA: number, intB: number): string {
    return `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
    <soap:Body>
        <AddResponse xmlns="http://tempuri.org/">
            <AddResult>${intA + intB}</AddResult>
        </AddResponse>
    </soap:Body>
</soap:Envelope>`;
  }

  private makSubtractBody(intA: number, intB: number): string {
    return `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
<soap:Body>
    <SubtractResponse xmlns="http://tempuri.org/">
        <SubtractResult>${intA - intB}</SubtractResult>
    </SubtractResponse>
</soap:Body>
</soap:Envelope>`;
  }

  private makeMultiplyBody(intA: number, intB: number): string {
    return `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
    <soap:Body>
        <MultiplyResponse xmlns="http://tempuri.org/">
            <MultiplyResult>${intA * intB}</MultiplyResult>
        </MultiplyResponse>
    </soap:Body>
</soap:Envelope>`;
  }

  private getDivideBody(intA: number, intB: number): string {
    return `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
    <soap:Body>
        <DivideResponse xmlns="http://tempuri.org/">
            <DivideResult>${intA / intB}</DivideResult>
        </DivideResponse>
    </soap:Body>
</soap:Envelope>`;
  }
}
