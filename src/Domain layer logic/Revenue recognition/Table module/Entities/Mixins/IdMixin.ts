const IdMixin = (superclass) => class extends superclass {
  protected id?: number = null;

  public setId(id: number): this {
    this.id = id;

    return this;
  }

  public getId(): number | null {
    return this.id
  }

  protected isNew(): boolean {
    return this.getId() === null;
  }
}

export default IdMixin;
