import Namer from "./Namer";
import FirstFirst from "./FirstFirst";

export default class NameFactory {

  /**
   * (?) The task doesn't describe which specific type of Namer (FirstFirst OR LastFirst) have to be created
   */
  public getName(name: string): Namer {
    return new FirstFirst(name);
  }
}
