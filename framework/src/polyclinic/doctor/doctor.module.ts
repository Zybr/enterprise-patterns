import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { MikroOrmModule } from "@mikro-orm/nestjs";
import Doctor from "./entities/doctor.entity";

@Module({
  imports: [
    MikroOrmModule.forFeature([
      Doctor
    ]),
  ],
  controllers: [DoctorController],
  providers: [DoctorService]
})
export class DoctorModule {}
