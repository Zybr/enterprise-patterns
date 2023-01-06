import Doctor from "../../Introduction/Decomposition/Doctors/Doctor";

export default interface IDoctorFactory {
  getDoctor(): Doctor;
}
