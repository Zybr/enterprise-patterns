import Doctor from "../../../Introduction/Decomposition/Doctors/Doctor";

export default class UndefinedDoctor extends Doctor {
  public constructor() {
    super('[Not found person]', '');
  }
}
