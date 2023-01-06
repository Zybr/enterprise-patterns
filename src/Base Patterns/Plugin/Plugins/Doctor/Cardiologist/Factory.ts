import IDoctorFactory from "../../../IDoctorFactory";
import Doctor from "../../../../../Introduction/Decomposition/Doctors/Doctor";
import { faker } from "@faker-js/faker";
import CardiologistDoctor from "../../../../../Introduction/Decomposition/Doctors/CardiologistDoctor";

export default class Factory implements IDoctorFactory {
  public getDoctor(): Doctor {
    return new CardiologistDoctor(
      faker.name.firstName(),
      faker.name.lastName(),
    );
  }
}
