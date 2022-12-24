import { Constructor, EntityData } from '@mikro-orm/core';
import { Factory, Faker } from '@mikro-orm/seeder';
import Doctor from "../../src/polyclinic/doctor/entities/doctor.entity";
import DoctorType from "../../src/polyclinic/doctor/enums/doctor-type.enum";

export default class DoctorFactory extends Factory<Doctor> {
  model: Constructor<Doctor> = Doctor;

  protected definition(faker: Faker): EntityData<Doctor> {
    const types = Object.values(DoctorType);

    return {
      type: types[Math.floor(Math.random() * types.length)],
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    }
  }
}
