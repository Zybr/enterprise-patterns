import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString, IsEnum } from "class-validator";
import Doctor from "../entities/doctor.entity";
import DoctorType from "../enums/doctor-type.enum";

export class CreateDoctorDto extends PartialType(Doctor) {
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
