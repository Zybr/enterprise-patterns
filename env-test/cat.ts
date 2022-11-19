export default class Cat {
  private weigh = 0;

  public setWeight(weight: number): this {
    this.weigh = weight;
    return this;
  }

  public getWeight(): number {
    return this.weigh;
  }
}
