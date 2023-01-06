import { IClient } from "../IClient";

export default class Client implements IClient {
  public request(url, params): Promise<Response> {
    return fetch(
      url,
      params,
    )
  }
}
