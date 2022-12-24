import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/sqlite'
import { InjectRepository } from "@mikro-orm/nestjs";
import Appointment from "./entities/appointment.entity";
import Service from "../generic/services/service";

@Injectable()
export class AppointmentService extends Service<Appointment> {
  public constructor(
    @InjectRepository(Appointment)
    protected readonly repository: EntityRepository<Appointment>
  ) {
    super();
  }
}
