import IDoctorFactory from "../../../IDoctorFactory";
import { faker } from "@faker-js/faker";
import Doctor from "../../../../../Introduction/Decomposition/Doctors/Doctor";
import OncologistDoctor from "../../../../../Introduction/Decomposition/Doctors/OncologistDoctor";

export default class Factory implements IDoctorFactory {
  public getDoctor(): Doctor {
    return new OncologistDoctor(
      faker.name.firstName(),
      faker.name.lastName(),
    );
  }
}
