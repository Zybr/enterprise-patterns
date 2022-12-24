import { PartialType } from '@nestjs/mapped-types';
import Doctor from "../entities/doctor.entity";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import DoctorType from "../enums/doctor-type.enum";

export class UpdateDoctorDto extends PartialType(Doctor) {
  @IsEnum(DoctorType)
  @IsNotEmpty()
  public type: DoctorType;

  @IsString()
  @IsNotEmpty()
  public firstName: string

  @IsString()
  @IsNotEmpty()
  public lastName: string
}
