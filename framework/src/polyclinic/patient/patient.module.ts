import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { MikroOrmModule } from "@mikro-orm/nestjs";
import Patient from "./entities/patient.entity";

@Module({
  imports: [
    MikroOrmModule.forFeature([
      Patient
    ]),
  ],
  controllers: [PatientController],
  providers: [PatientService]
})
export class PatientModule {
}
