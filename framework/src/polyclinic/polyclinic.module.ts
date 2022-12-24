import { Module } from '@nestjs/common';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  imports: [
    PatientModule,
    DoctorModule,
    AppointmentModule,
  ],
  controllers: [],
  providers: []
})
export class PolyclinicModule {
}
