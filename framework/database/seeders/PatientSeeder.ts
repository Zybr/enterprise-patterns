import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import PatientFactory from "../factories/patient.factory";

export class PatientSeeder extends Seeder {
  private readonly COUNT = 12

  async run(em: EntityManager): Promise<void> {
    new PatientFactory(em).make(this.COUNT);
  }
}
