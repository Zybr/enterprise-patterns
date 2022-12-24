import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString } from "class-validator";
import Patient from "../entities/patient.entity";

export class CreatePatientDto extends PartialType(Patient) {
  @IsString()
  @IsNotEmpty()
  public firstName: string

  @IsString()
  @IsNotEmpty()
  public lastName: string
}
