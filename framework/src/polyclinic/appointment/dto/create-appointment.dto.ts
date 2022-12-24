import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateAppointmentDto {
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  public doctor: number

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  public patient: number
}
