export interface IClient {
  request(url, prams): Promise<Response>;
}
