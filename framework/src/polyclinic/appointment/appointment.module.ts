import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { MikroOrmModule } from "@mikro-orm/nestjs";
import Appointment from "./entities/appointment.entity";
import Patient from "../patient/entities/patient.entity";
import Doctor from "../doctor/entities/doctor.entity";

@Module({
  imports: [
    MikroOrmModule.forFeature([
      Patient,
      Doctor,
      Appointment
    ]),
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService]
})
export class AppointmentModule {
}
