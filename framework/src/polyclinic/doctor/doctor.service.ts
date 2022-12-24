import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/sqlite'
import { InjectRepository } from "@mikro-orm/nestjs";
import Doctor from "./entities/doctor.entity";
import Service from "../generic/services/service";

@Injectable()
export class DoctorService extends Service<Doctor> {
  public constructor(
    @InjectRepository(Doctor)
    protected readonly repository: EntityRepository<Doctor>
  ) {
    super();
  }
}
