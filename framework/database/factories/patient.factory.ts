import { Constructor, EntityData } from '@mikro-orm/core';
import { Factory, Faker } from '@mikro-orm/seeder';
import Patient from "../../src/polyclinic/patient/entities/patient.entity";

export default class PatientFactory extends Factory<Patient> {
  model: Constructor<Patient> = Patient;

  protected definition(faker: Faker): EntityData<Patient> {
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    }
  }
}
