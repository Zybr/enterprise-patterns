import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/sqlite'
import { InjectRepository } from "@mikro-orm/nestjs";
import Patient from "./entities/patient.entity";
import Service from "../generic/services/service";

@Injectable()
export class PatientService extends Service<Patient> {
  public constructor(
    @InjectRepository(Patient)
    protected readonly repository: EntityRepository<Patient>
  ) {
    super();
  }
}
