import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import Patient from "../../src/polyclinic/patient/entities/patient.entity";
import Doctor from "../../src/polyclinic/doctor/entities/doctor.entity";
import Appointment from "../../src/polyclinic/appointment/entities/appointment.entity";

export class AppointmentSeeder extends Seeder {
  private shuffle(list: any[]): any[] {
    return list.sort(() => Math.random() - 0.5)
  }

  async run(em: EntityManager): Promise<void> {
    const patients = await em.find(Patient, {}).then(this.shuffle);
    const doctors = await em.find(Doctor, {}).then(this.shuffle);

    while (patients.length && doctors.length) {
      em.create(Appointment, {
        patient: patients.pop(),
        doctor: doctors.pop(),
      });
    }
  }
}
