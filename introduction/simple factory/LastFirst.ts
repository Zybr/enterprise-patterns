import Namer from "./Namer";

export default class LastFirst extends Namer {
  public constructor(name: string) {
    super();
    this.lName = name;
  }
}
