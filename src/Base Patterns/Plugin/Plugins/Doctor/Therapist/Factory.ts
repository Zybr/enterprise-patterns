import IDoctorFactory from "../../../IDoctorFactory";
import { faker } from "@faker-js/faker";
import TherapistDoctor from "../../../../../Introduction/Decomposition/Doctors/TherapistDoctor";
import Doctor from "../../../../../Introduction/Decomposition/Doctors/Doctor";

export default class Factory implements IDoctorFactory {
  public getDoctor(): Doctor {
    return new TherapistDoctor (
      faker.name.firstName(),
      faker.name.lastName(),
    );
  }
}
