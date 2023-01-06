import Person from "../../Introduction/Decomposition/Person";

export default class UndefinedPerson extends Person {
  public constructor() {
    super('[Not found person]', '');
  }
}
