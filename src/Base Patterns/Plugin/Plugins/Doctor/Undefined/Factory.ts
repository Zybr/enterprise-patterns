import IDoctorFactory from "../../../IDoctorFactory";
import Doctor from "../../../../../Introduction/Decomposition/Doctors/Doctor";
import UndefinedDoctor from "../../../../Special Case/Doctors/UndefinedDoctor";

export default class Factory implements IDoctorFactory {
  public getDoctor(): Doctor {
    return new UndefinedDoctor();
  }
}
