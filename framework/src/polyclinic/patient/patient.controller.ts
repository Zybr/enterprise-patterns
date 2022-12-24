import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import Patient from "./entities/patient.entity";

@Controller('patient')
export class PatientController {
  constructor(
    private readonly patientService: PatientService
  ) {
  }

  @Post()
  public create(@Body() createPatientDto: CreatePatientDto): Promise<Patient> {
    return this.patientService.create(createPatientDto);
  }

  @Get()
  public findAll(): Promise<Patient[]> {
    return this.patientService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: number): Promise<Patient | null> {
    return this.patientService.findOne(id);
  }

  @Put(':id')
  public update(@Param('id') id: number, @Body() updatePatientDto: UpdatePatientDto): Promise<Patient> {
    return this.patientService.update(id, updatePatientDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: number): Promise<void> {
    return this.patientService.remove(id);
  }
}
