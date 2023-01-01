export default interface IStorage<R> {
  read(id: number): Promise<R | null>

  write(record: R): Promise<R>

  clear(): Promise<void>
}
