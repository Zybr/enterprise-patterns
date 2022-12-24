import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentDto } from './create-appointment.dto';
import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  public doctor: number

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  public patient: number
}
