export default interface RowDataGateway {
  create(): Promise<this>

  update(): Promise<this>

  delete(): Promise<boolean>
}

