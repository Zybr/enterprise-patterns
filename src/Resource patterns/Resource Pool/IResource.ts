export default interface IResource {
  selectOne(sql: string, params: []): Promise<[] | null>;

  close(): this;
}
