import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import DoctorFactory from "../factories/doctor.factory";

export class DoctorSeeder extends Seeder {
  private readonly COUNT = 4;

  async run(em: EntityManager): Promise<void> {
    new DoctorFactory(em).make(this.COUNT);
  }
}
