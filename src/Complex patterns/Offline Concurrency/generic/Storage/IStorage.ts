export default interface IStorage<R> {
  read(id: number): R | null

  write(record: R): R

  clear(): void
}
