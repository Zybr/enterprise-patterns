import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import Appointment from "./entities/appointment.entity";

@Controller('appointment')
export class AppointmentController {
  constructor(
    private readonly appointmentService: AppointmentService
  ) {
  }

  @Post()
  public create(@Body() createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    return this.appointmentService.create(createAppointmentDto);
  }

  @Get()
  public findAll(): Promise<Appointment[]> {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: number): Promise<Appointment | null> {
    return this.appointmentService.findOne(id);
  }

  @Put(':id')
  public update(@Param('id') id: number, @Body() updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
    return this.appointmentService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: number): Promise<void> {
    return this.appointmentService.remove(id);
  }
}
