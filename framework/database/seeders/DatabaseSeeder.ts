import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { PatientSeeder } from "./PatientSeeder";
import { DoctorSeeder } from "./DoctorSeeder";
import { AppointmentSeeder } from "./AppointmentSeeder";

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    return this.call(em, [
      PatientSeeder,
      DoctorSeeder,
      AppointmentSeeder,
    ]);
  }
}
